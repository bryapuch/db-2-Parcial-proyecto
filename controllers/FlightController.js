const { request, response } = require('express');
const flightModel = require('../model/Flight')();

// let flightModel = new Flight();

const ObtenerVuelos = async function (req = request, res = response) {

  try {
    
    let data = await flightModel.readData();
    if (data == null) {

      res.status(404).send("No record found")

    }
    res.send(data)
    
  } catch (error) {
    res.status(500).send(error);
  }

}

const ObtenerOneVuelo = async function (req = request, res = response) {

  try {
    
    let data = await flightModel.readDataOne(req.body.FlightId);
    if (data == null) {

      res.status(404).send("No record found")

    }
    res.send(data)
    
  } catch (error) {
    res.status(500).send(error);
  }
}

const changeVuelo = async function (req = request, res = response) {

  Flightid = req.body.FlightId;
  Flightsource = req.body.FlightSource;
  Flightdest = req.body.FlightDest;
  Flightdate = req.body.FlightDate;
  Flightseat = req.body.FlightSeat;
  Ticketcost = req.body.TicketCost;

  let data = await flightModel.updateData(Flightid,Flightsource,Flightdest,Flightdate,Flightseat,Ticketcost);

  if (data == null) {

    return res.status(404).json({
      message: 'No existe datos en la tabla en vuelos.'
    });

  }

  res.send(data)
  return res.json(data);
}

const newVuelo = async function (req = request, res = response) {

  Flightid = req.body.FlightId;
  Flightsource = req.body.FlightSource;
  Flightdest = req.body.FlightDest;
  Flightdate = req.body.FlightDate;
  Flightseat = req.body.FlightSeat;
  Ticketcost = req.body.TicketCost;

  let data = await flightModel.insertData(Flightid,Flightsource,Flightdest,Flightdate,Flightseat,Ticketcost);

  if (data == null) {

    return res.status(505).json({
      message: 'No se pudo crear un nuevo vuelo'
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