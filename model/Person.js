
const database = require('../database/config')();

var Person = function () {

  return {

    readData: async function () {
      // [START spanner_read_data]
      const query = {
        sql: 'Select * FROM Persons'
      };
      try {
        let result = await database.run(query);
        if (result[0]) {
          var rows = result[0].map((row) => row.toJSON());
          return rows;
        } else {
          return null
        }

      } catch (err) {
        throw ("error in readData function of Persons table", err)
      }
      // [END spanner_read_data]
    },

    readDataOne: async function (PassId) {
      // [START spanner_read_data]
      const query = {
        sql: `Select * FROM Persons WHERE PassId = ${PassId}`
      };
      try {
        let result = await database.run(query);
        if (result[0]) {
          var rows = result[0].map((row) => row.toJSON());
          return rows;
        } else {
          return null
        }

      } catch (err) {
        throw ("error in readDataOne  function", err)
      }
      // [END spanner_read_data]
    },

    insertData: async function (flightid, bookingId, passId, passname, passEmail, passDob) {

      // Instantiate Spanner table objects
      const PersonTable = database.table('Persons');

      // Inserts rows into the Singers table
      // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
      // they must be converted to strings before being inserted as INT64s
      try {
        await PersonTable.insert([
          { FlightId: flightid, BookingId: bookingId, PassId: passId, PassDob: passDob, PassEmail: passEmail, Passname: passname }
        ]);

        console.log('Inserted data.');
      } catch (err) {
        console.error('ERROR:', err);
      }
      // [END spanner_insert_data]
    },

    updateData: async function (PassId, Passname, PassEmail, PassDob,FlightId,BookingId) {


      database.runTransaction(async (err, transaction) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const [rowCount] = await transaction.runUpdate({
            sql: `UPDATE Persons SET PassDob = '${PassDob}', PassEmail = '${PassEmail}', Passname = '${Passname}' 
              WHERE FlightId = '${FlightId}' AND BookingId = ${BookingId} AND PassId = ${PassId}`,
          });

          console.log(`Successfully updated ${rowCount} record.`);
          await transaction.commit();
        } catch (err) {
          console.error('ERROR:', err);
        }
      });
      // [END spanner_dml_standard_update]

    },

    deleteData: async function (PassId,FlightId,BookingId) {

      database.runTransaction(async (err, transaction) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const [rowCount] = await transaction.runUpdate({
            sql: `DELETE FROM Persons  WHERE FlightId = '${FlightId}' AND BookingId = ${BookingId} AND PassId = ${PassId}`,
          });

          console.log(`Successfully deleted ${rowCount} record.`);
          await transaction.commit();
        } catch (err) {
          console.error('ERROR:', err);
        }
      });
      // [END spanner_dml_standard_delete]

    }
  }
}

module.exports = Person;