
var express = require('express');

const { ObtenerBookings, ObtenerOneBooking, newBooking } = require('../controllers/BookingController');

var router = express.Router();

router.get('/',ObtenerBookings);

router.get('/:id',ObtenerOneBooking);

router.post('/',newBooking);

module.exports = router;