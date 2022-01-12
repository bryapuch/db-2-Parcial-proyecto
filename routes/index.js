var express = require('express');
const { home, miViaje, detalleReserva, miViajePerson } = require('../controllers/IndexController');
var router = express.Router();

/* GET home page. */
router.get('/', home);
/* Get Search flight by person*/
router.get('/mi-viaje', miViaje);

/* */
router.get('/mi-viaje/:id', miViajePerson);
/*GET reserva for flight  */
router.get('/reservacion/:id',detalleReserva);

module.exports = router;
