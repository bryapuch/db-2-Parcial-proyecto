
const database = require('../database/config')();

var Flight = function () {

  return {
    readData: async function () {
      const query = {
        sql: 'Select FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost FROM Flights'
      };
      try {
        // const [rows] = await albumsTable.read(query);
        let result = await database.run(query);
        if (result[0]) {
          var rows = result[0].map((row) => row.toJSON());
          return rows;
        } else {
          return null
        }
        // rows.forEach(row => {
        //   const json = row.toJSON();
        //   console.log(
        //     `FlightId: ${json.FlightId}, FlightSource: ${json.FlightSource}, FlightDest: ${json.FlightDest}`
        //   );
        //   return json;
        // });
      } catch (err) {
        throw ("error in getAllUsers function", err)
      } finally {
        // Close the database when finished.
        // await database.close();
      }
      // [END spanner_read_data]
    },

    insertData: async function (FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost) {


      // Instantiate Spanner table objects
      const singersTable = database.table('Singers');
      const albumsTable = database.table('Albums');

      // Inserts rows into the Singers table
      // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
      // they must be converted to strings before being inserted as INT64s
      try {
        await singersTable.insert([
          { SingerId: '1', FirstName: 'Marc', LastName: 'Richards' },
          { SingerId: '2', FirstName: 'Catalina', LastName: 'Smith' },
          { SingerId: '3', FirstName: 'Alice', LastName: 'Trentor' },
          { SingerId: '4', FirstName: 'Lea', LastName: 'Martin' },
          { SingerId: '5', FirstName: 'David', LastName: 'Lomond' },
        ]);

        await albumsTable.insert([
          { SingerId: '1', AlbumId: '1', AlbumTitle: 'Total Junk' },
          { SingerId: '1', AlbumId: '2', AlbumTitle: 'Go, Go, Go' },
          { SingerId: '2', AlbumId: '1', AlbumTitle: 'Green' },
          { SingerId: '2', AlbumId: '2', AlbumTitle: 'Forever Hold your Peace' },
          { SingerId: '2', AlbumId: '3', AlbumTitle: 'Terrified' },
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

module.exports = Flight;