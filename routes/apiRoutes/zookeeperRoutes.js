//start an instance of Router
const router = require('express').Router();

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
  } = require('../../lib/zookeepers');
const {zookeepers} = require ('../../data/zookeepers');


router.post('/zookeepers', (req, res) => {
    console.log('post body', req.body);
    req.body.id = zookeepers.length.toString();
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted.')
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
        //req.query values are all strings, so age is a string
        console.log('req.query',req.query);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    console.log('req.params',req.params);
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404)
    }
});

module.exports = router;