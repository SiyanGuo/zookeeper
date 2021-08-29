const router = require('express').Router();
// why not ("./animalRoutes")?
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(animalRoutes);
module.exports = router;