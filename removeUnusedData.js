const fs = require('fs');
const path = require('path');

const removeUnusedData = () => {
    console.log('Removing unused data...', path.join(__dirname, 'data', 'matches'));
    // First we remove all the folders inside data/matches except the one with the name 2 (the one we want to keep)
    fs.readdirSync(path.join(__dirname, 'data', 'matches')).forEach((file) => {
        if (file !== '2') {
            console.log('Removing folder: ' + file);
            fs.rmdirSync(path.join(__dirname, 'data', 'matches', file), { recursive: true });
        }
    });

    // Then we read the json files inside data/matches/2 to get the ids of the matches we want to keep

    const matchesList = [];

    fs.readdirSync(path.join(__dirname, 'data', 'matches', '2')).forEach((file) => {
        const matches = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'matches', '2', file)));
        matches.forEach((match) =>
            matchesList.push(match.match_id)
        );
        
    });

    // Now that we have the list of matches we want to keep, we can remove the rest of the files inside data/lineups, data/events and data/three-sixty
    fs.readdirSync(path.join(__dirname, 'data', 'lineups')).forEach((file) => {
        const matchId = file.split('.')[0];
        if (!matchesList.includes(Number(matchId))) {
            console.log('Removing file: ' + file);
            fs.unlinkSync(path.join(__dirname, 'data', 'lineups', file));
        }
    });

    fs.readdirSync(path.join(__dirname, 'data', 'events')).forEach((file) => {
        const matchId = file.split('.')[0];
        if (!matchesList.includes(Number(matchId))) {
            console.log('Removing file: ' + file);
            fs.unlinkSync(path.join(__dirname, 'data', 'events', file));
        }
    });

    fs.readdirSync(path.join(__dirname, 'data', 'three-sixty')).forEach((file) => {
        const matchId = file.split('.')[0];
        if (!matchesList.includes(Number(matchId))) {
            console.log('Removing file: ' + file);
            fs.unlinkSync(path.join(__dirname, 'data', 'three-sixty', file));
        }
    });
};

removeUnusedData();
// Hot to execute this file: node removeUnusedData.js 