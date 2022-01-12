const { request, response } = require('express');
const BookingModel = require('../model/Bookings')();

// let flightModel = new Flight();

const ObtenerBookings = async function (req = request, res = response) {

  try {
    
    let data = await BookingModel.readData();

    if (data == null) {

      res.status(404).send("No record found")

    }
    res.send(data)
    // return res.json(data);    
  } catch (error) {
    res.status(500).send(error);
  }

}

const ObtenerOneBooking = async function (req = request, res = response) {

  try {
    BookingId = Number(req.params.id);
    let data = await BookingModel.readDataOne(BookingId);
    if (data == null) {

      res.status(404).send("No record found")

    }
    res.send(data)
    
  } catch (error) {
    res.status(500).send(error);
  }

}

const newBooking = async function (req = request, res = response) {

  FlightId = Number(req.body.FlightId);
  BookingId = Number(req.body.BookingId);
  Bookdate = req.body.Bookdate;

  let data = await BookingModel.insertData(FlightId,BookingId,Bookdate);

  if (data == null) {

    return res.status(200).json({
      message: 'Se creo con exito el nuevo vuelo'
    });

  }

  res.send(data)
  return res.json(data);

}

module.exports = {
  ObtenerBookings,
  ObtenerOneBooking,
  newBooking
}