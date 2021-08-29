const router = require('express').Router();
const path = require ('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'))
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'))
});

//wildcard route to catch endpoints that doesn't exist
router.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

module.exports = router;