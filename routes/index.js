var express = require('express');
const { home, miViaje } = require('../controllers/IndexController');
var router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/mi-viaje', miViaje);

module.exports = router;
