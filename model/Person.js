
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
        throw ("error in getAllUsers function", err)
      } finally {
        // Close the database when finished.
        await database.close();
      }
      // [END spanner_read_data]
    },

    insertData: async function (flightid, bookingId, passId, passname , passEmail, passDob) {


      // Instantiate Spanner table objects
      const flightsTable = database.table('Person');

      // Inserts rows into the Singers table
      // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
      // they must be converted to strings before being inserted as INT64s
      try {
        await flightsTable.insert([
          { FlightId: flightid, BookingId: bookingId, PassId:passId, flightdest, Passname:passname,  PassEmail:passEmail, PassDob:passDob}
        ]);

        console.log('Inserted data.');
      } catch (err) {
        console.error('ERROR:', err);
      } finally {
        await database.close();
      }
      // [END spanner_insert_data]
    },

    updateData: async function (FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost) {

      const albumsTable = database.table('Albums');

      try {
        await albumsTable.update([
          { SingerId: '1', AlbumId: '1', MarketingBudget: '100000' },
          { SingerId: '2', AlbumId: '2', MarketingBudget: '500000' },
        ]);
        console.log('Updated data.');
      } catch (err) {
        console.error('ERROR:', err);
      } finally {
        // Close the database when finished.
        database.close();
      }
      // [END spanner_update_data]
    },

    deleteData: async function (FlightId) {

      // Instantiate Spanner table object
      const albumsTable = database.table('Albums');

      // Deletes individual rows from the Albums table.
      try {
        const keys = [
          [2, 1],
          [2, 3],
        ];
        await albumsTable.deleteRows(keys);
        console.log('Deleted individual rows in Albums.');
      } catch (err) {
        console.error('ERROR:', err);
      }

      // Delete a range of rows where the column key is >=3 and <5
      database.runTransaction(async (err, transaction) => {
        if (err) {
          console.error(err);
          return;
        }
        try {
          const [rowCount] = await transaction.runUpdate({
            sql: 'DELETE FROM Singers WHERE SingerId >= 3 AND SingerId < 5',
          });
          console.log(`${rowCount} records deleted from Singers.`);
        } catch (err) {
          console.error('ERROR:', err);
        }

        // Deletes remaining rows from the Singers table and the Albums table,
        // because Albums table is defined with ON DELETE CASCADE.
        try {
          // The WHERE clause is required for DELETE statements to prevent
          // accidentally deleting all rows in a table.
          // https://cloud.google.com/spanner/docs/dml-syntax#where_clause
          const [rowCount] = await transaction.runUpdate({
            sql: 'DELETE FROM Singers WHERE true',
          });
          console.log(`${rowCount} records deleted from Singers.`);
          await transaction.commit();
        } catch (err) {
          console.error('ERROR:', err);
        } finally {
          // Close the database when finished.
          await database.close();
        }
      });
      // [END spanner_delete_data]
    }
  }
}

module.exports = Person;