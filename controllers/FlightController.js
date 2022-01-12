const { request, response } = require('express');
const flightModel = require('../model/Flight')();

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
    
    let data = await flightModel.readDataOne(req.params.id);
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
  Flightseat = Number(req.body.FlightSeat);
  Ticketcost = parseFloat(req.body.TicketCost);

  let data = await flightModel.updateData(Flightid,Flightsource,Flightdest,Flightdate,Flightseat,Ticketcost);
  if (data == null) {
    return res.status(200).json({
      message: 'Se modifico con exito'
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
  Flightseat = Number(req.body.FlightSeat);
  Ticketcost = parseFloat(req.body.TicketCost);

  let data = await flightModel.insertData(Flightid,Flightsource,Flightdest,Flightdate,Flightseat,Ticketcost);

  if (data == null) {

    return res.status(200).json({
      message: 'Se creo con exito el nuevo vuelo'
    });

  }

  res.send(data)
  return res.json(data);

}

const deleteVuelo = async function (req = request, res = response) {

  let data = await flightModel.deleteData(req.params.id);

  if (data == null) {

    return res.status(200).json({
      message: 'Se elimino correctamente'
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