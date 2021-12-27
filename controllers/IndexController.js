
const home = function (req, res, next) {
    res.render('index', { title: 'Express' });
}
const miViaje = function (req, res, next) {
    res.render('mi-viaje', { title: 'Mis viajes' });
}
module.exports = {
    home,
    miViaje
}