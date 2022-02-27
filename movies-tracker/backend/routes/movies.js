const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')

const Movie = require('../models/Movie');

router.get('/', isAuth,(req, res) => {
    Movie.find({ userID: req.user.id }).then(movies => res.json(movies));
});

router.post('/add', isAuth, (req, res) => {
    const name = req.body.name;
    const year = Number(req.body.year);
    const time = Number(req.body.time);
    const genre = req.body.genre;
    const userID = req.user.id;
    const newMovie = new Movie({
        name: name,
        year: year,
        time: time,
        genre: genre,
        userID: userID
    });
    newMovie.save().then(movie => res.json(movie)).catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', isAuth, (req, res) => {
    Movie.findByIdAndDelete(req.params.id).then(() => res.json("Movie deleted.")).catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', isAuth, (req, res) => {
    Movie.findById(req.params.id).then(movie => {
        movie.name = req.body.name;
        movie.year = Number(req.body.year);
        movie.time = Number(req.body.time);
        movie.genre = req.body.genre;
        movie.save().then(movie => res.json(movie)).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => err => res.status(400).json('Error: ' + err));
});

module.exports = router;