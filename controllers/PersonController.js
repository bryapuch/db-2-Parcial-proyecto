const { request, response } = require('express');
const PersonModel = require('../model/Person')();

const ObtenerPersons = async function (req = request, res = response) {

  try {


    let data = await PersonModel.readData();

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

const ObtenerOnePerson = async function (req = request, res = response) {

  try {

    let data = await PersonModel.readDataOne(req.params.id);
    if (data == null) {

      res.status(404).send("No record found")

    }
    res.send(data)

  } catch (error) {
    res.status(500).send(error);
  }

}

const changePerson = async function (req = request, res = response) {


  PassId = Number(req.body.PassId);
  Passname = req.body.Passname;
  PassEmail = req.body.PassEmail;
  PassDob = req.body.PassDob;
  FlightId = Number(req.body.FlightId);
  BookingId = req.body.BookingId;

  let data = await PersonModel.updateData(PassId,Passname,PassEmail,PassDob,FlightId,BookingId);

  if (data == null) {
    return res.status(200).json({
      message: 'Se modifico con exito'
    });
  }

  res.send(data)
  return res.json(data);
}

const newPerson = async function (req = request, res = response) {

  Flightid = Number(req.body.FlightId);
  BookingId = Number(req.body.BookingId);
  PassId = Number(req.body.PassId);
  Passname = req.body.Passname;
  PassEmail = req.body.PassEmail;
  PassDob = req.body.PassDob;

  let data = await PersonModel.insertData(Flightid, BookingId, PassId, Passname, PassEmail, PassDob);

  if (data == null) {

    return res.status(200).json({
      message: 'Se creo con exito nuevo person'
    });

  }

  res.send(data)
  return res.json(data);

}

const deletePerson = async function (req = request, res = response) {

  PassId = req.body.PassId;
  FlightId = req.body.FlightId;
  BookingId = req.body.BookingId;

  let data = await PersonModel.deleteData(PassId,FlightId,BookingId);

  if (data == null) {

    return res.status(200).json({
      message: 'Se elimino correctamente'
    });

  }

  res.send(data)
  return res.json(data);

}

module.exports = {
  ObtenerPersons,
  ObtenerOnePerson,
  changePerson,
  newPerson,
  deletePerson
}