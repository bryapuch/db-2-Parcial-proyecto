var express = require('express');
const { home, miViaje, detalleReserva } = require('../controllers/IndexController');
var router = express.Router();

/* GET home page. */
router.get('/', home);
/* Get Search flight by person*/
router.get('/mi-viaje', miViaje);
/*GET reserva for flight  */
router.get('/reservacion/:id',detalleReserva);

module.exports = router;
