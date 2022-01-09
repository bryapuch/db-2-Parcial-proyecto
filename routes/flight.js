var express = require('express');
const { newVuelo, changeVuelo, deleteVuelo, ObtenerVuelos, ObtenerOneVuelo } = require('../controllers/FlightController');
var router = express.Router();

/* GET users listing. */
router.get('/', ObtenerVuelos);

router.get('/:id', ObtenerOneVuelo);

router.post('/', newVuelo);

router.put('/:id', changeVuelo);

router.delete('/:id', deleteVuelo);

module.exports = router;
