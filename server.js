const fs = require('fs');
const path = require('path');

const { animals } = require('./data/animals');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;
    let personalityTraitsArray = [];

    if (query.personalityTraits) {
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
    }
    // Loop through each trait in the personalityTraits array:
    // Check the trait against each animal in the filteredResults array.
    // Remember, it is initially a copy of the animalsArray, but here we're updating it for each trait in the .forEach() loop.
    // For each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait,
    // so at the end we'll have an array of animals that have every one of the traits when the .forEach() loop is finished.
    personalityTraitsArray.forEach(trait => {
        filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
    });

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    console.log(body);
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({animals:animalsArray}, null, 2)
    );

    return animal;
}


function validateAnimal(animal){
    if(!animal.name || typeof animal.name !=='string'){
        return false;
    }
    if(!animal.species || typeof animal.species !== 'string'){
        return false;
    }
    if(!animal.diet || typeof animal.diet !=='string'){
        return false;
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
        return false;
    }
    return true;
}


//create data using POST route
app.post('/api/animals', (req, res) => {
    //req.body is where our incoming content will be
    //set id based on what the next index of the array will be 
    req.body.id = animals.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.')
    } else {
        //add animal to JSON file 
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

//handle requests for animals
app.get('/api/animals', (req, res) => {
    // res.send('Hello!')
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
        console.log(req.query);
    }
    res.json(results);
});

//handle requests for a specific animal
app.get('/api/animals/:id', (req, res) => {
    console.log(req.params);
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404)
    }
});


app.listen(PORT, () => {
    console.log(`App server now on ${PORT}!`);
})