const { request, response } = require('express');
const flightModel = require('../model/Flight')();

// let flightModel = new Flight();

const ObtenerVuelos = async function (req = request, res = response) {

  try {
    
    console.log('antes de read Data')
    let data = await flightModel.readData();
    console.log('despeus de readData')
    if (data == null) {

      res.status(404).send("No record found")
      // return res.status(404).json({
      //   message: 'No existe datos en la tabla en vuelos.'
      // });

    }
    res.send(data)
    // return res.json(data);    
  } catch (error) {
    res.status(500).send(error);
  }

}

const ObtenerOneVuelo = async function (req = request, res = response) {

}

const changeVuelo = async function (req = request, res = response) {

  let data = await flightModel.updateData(req.body.FlightId, req.body.FlightSource, req.body.FlightDest, req.body.FlightDate, req.body.FlightSeat, req.body.TicketCost);

  if (data == null) {

    return res.status(404).json({
      message: 'No existe datos en la tabla en vuelos.'
    });

  }

  res.send(data)
  return res.json(data);
}

const newVuelo = async function (req = request, res = response) {

  let data = await flightModel.insertData();

  if (data == null) {

    return res.status(404).json({
      message: 'No existe datos en la tabla en vuelos.'
    });

  }

  res.send(data)
  return res.json(data);

}

const deleteVuelo = async function (req = request, res = response) {

  let data = await flightModel.deleteData();

  if (data == null) {

    return res.status(404).json({
      message: 'No existe datos en la tabla en vuelos.'
    });

  }

  res.send(data)
  return res.json(data);

}

module.exports = {
  ObtenerVuelos,
  ObtenerOneVuelo,
  changeVuelo,
  newVuelo,
  deleteVuelo
}