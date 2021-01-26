const express = require('express');
const morgan = require('morgan');
const app = express();
const playstore = require('./playstore.js');

app.use(morgan('common'));

app.get("/apps", (req, res) => {
    const { sort, genres } = req.query;

    if(sort) {
        if(!['Rating', 'App'].includes(sort)){
            return res.status(400).send("Must sort by either Rating or App.")
        }
    }

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
            return res.status(400).send("Genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card")
        }
    }

    let results = playstore;

    if (genres) {
        results = results.filter(app => {
            return app.Genres.toLowerCase() === genres.toLowerCase();
        });
    }

    if(sort) {
        results = results.sort((a,b) => {
            return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
            // if a>b return -1, else if a<b return 1, else return 0
            // true/false statment ? return true : return false
        })
    }

    res.json(results);
})

app.listen(8001, () => {
    console.log('Playstore is running at http://localhost:8001');
});

module.exports = app;