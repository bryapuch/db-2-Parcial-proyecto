
const database = require('../database/config')();

var Flight = function () {

  return {
    readData: async function () {
      // [START spanner_read_data]
      const query = {
        sql: 'Select FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost FROM Flights'
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
        throw ("error in readData function", err)
      }
      // [END spanner_read_data]
    },

    readDataOne: async function(FlightId){
            // [START spanner_read_data]
            const query = {
              sql: `Select * FROM Flights WHERE FlightId = ${FlightId}`
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
    insertData: async function (flightid, flightsource, flightdest, flightdate, flightseat, ticketcost) {


      // Instantiate Spanner table objects
      const flightsTable = database.table('Flights');

      // Inserts rows into the Singers table
      // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
      // they must be converted to strings before being inserted as INT64s
      try {
        await flightsTable.insert([
          { FlightId: flightid, FlightSource: flightsource, FlightDest: flightdest, Flightdate: flightdate,flightseat:flightseat ,ticketcost: ticketcost  }
        ]);

        console.log('Inserted data.');
      } catch (err) {
        console.error('ERROR:', err);
      }
      // [END spanner_insert_data]
    },

    updateData: async function (FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost) {

      database.runTransaction(async (err, transaction) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const [rowCount] = await transaction.runUpdate({
            sql: `UPDATE Flights SET FlightSource = '${FlightSource}', FlightDest = '${FlightDest}', FlightDate = '${FlightDate}', FlightSeat = ${FlightSeat}, TicketCost = ${TicketCost} 
              WHERE FlightId = ${FlightId} `,
          });
          await transaction.commit();
        } catch (err) {
          console.error('ERROR:', err);
        }
      });
      // [END spanner_dml_standard_update]
    },

    deleteData: async function (FlightId) {

      database.runTransaction(async (err, transaction) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const [rowCount] = await transaction.runUpdate({
            sql: `DELETE FROM Flights WHERE FlightId = ${FlightId}`,
          });
    
          console.log(`Successfully deleted ${rowCount} record.`);
          await transaction.commit();
        } catch (err) {
          console.error('ERROR:', err);
        }
      });
    }
  }
}

module.exports = Flight;