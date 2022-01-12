
const home = function (req, res, next) {
    res.render('index', { title: 'Express' });
}
const miViaje = function (req, res, next) {
    res.render('mi-viaje', { title: 'Mis viajes' });
}
const detalleReserva = function (req, res, next) {

    let flightId = req.params.id;

    res.render('reserva', { title: `Reserva` });
}
module.exports = {
    home,
    miViaje,
    detalleReserva
}