//start an instance of Router
const router = require('express').Router();

const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const {animals} = require ('../../data/animals');


//create data using POST route
//remove api/ from url & change app.post to router.get
router.post('/animals', (req, res) => {
    //req.body is where our incoming content will be
    //set id based on what the next index of the array will be 
    req.body.id = animals.length.toString();
    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        //where to find send msg????
        res.status(400).send('The animal is not properly formatted.')
    } else {
        //add animal to JSON file 
        const animal = createNewAnimal(req.body, animals);
        //sending JS obj in JSON format (response)
        res.json(animal);
    }
});

//handle requests for animals
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
        console.log('req.query',req.query);
    }
    res.json(results);
});

//handle requests for a specific animal
router.get('/animals/:id', (req, res) => {
    console.log('req.params',req.params);
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404)
    }
});

module.exports = router;