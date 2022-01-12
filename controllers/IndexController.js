const Flight = require('../model/Flight')();
const PersonModel = require('../model/Person')();

const home = async function (req, res, next) {

    let datos = await Flight.readData()
    res.render('index', { title: 'Express', datos:datos });
}
const miViaje = function (req, res, next) {

    let isData = false;
    res.render('mi-viaje', { title: 'Mis viajes', isData});
}
const miViajePerson = async function (req, res, next) {
    
    let flightId = req.params.id;
    let data = await PersonModel.readDataOne(flightId);
    let isData = true;
    res.render('mi-viaje', { title: 'Mis viajes', data:data, isData });
}

const detalleReserva = function (req, res, next) {

    let flightId = req.params.id;

    res.render('reserva', { title: `Reserva` });
}
module.exports = {
    home,
    miViaje,
    detalleReserva,
    miViajePerson
}