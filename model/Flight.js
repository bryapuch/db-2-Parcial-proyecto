const { Spanner } = require('@google-cloud/spanner');

var Flight = function () {

  Flight.prototype.readData = async function () {
    // [START spanner_read_data]
    // Imports the Google Cloud client library

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */




    // Creates a client
    const spanner = new Spanner({
      projectId: process.env.PROJECTID,
    });

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(process.env.INSTANCEID);
    const database = instance.database(process.env.DATABASEID);

    // Reads rows from the Albums table
    // const albumsTable = database.table('Flights');

    const query = {
      sql: 'Select FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost FROM'
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
  }

  Flight.prototype.insertData = async function (FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost) {
    // [START spanner_insert_data]
    // Imports the Google Cloud client library
    const { Spanner } = require('@google-cloud/spanner');

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const projectId = 'my-project-id';
    // const instanceId = 'my-instance';
    // const databaseId = 'my-database';

    // Creates a client
    const spanner = new Spanner({
      projectId: projectId,
    });

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

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
  }

  Flight.prototype.updateData = async function (FlightId, FlightSource, FlightDest, FlightDate, FlightSeat, TicketCost) {
    // [START spanner_update_data]
    // Imports the Google Cloud client library
    const { Spanner } = require('@google-cloud/spanner');

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const projectId = 'my-project-id';
    // const instanceId = 'my-instance';
    // const databaseId = 'my-database';

    // Creates a client
    const spanner = new Spanner({
      projectId: projectId,
    });

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    // Update a row in the Albums table
    // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so they
    // must be converted to strings before being inserted as INT64s
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
  }

  Flight.prototype.deleteData = async function (FlightId) {
    // [START spanner_delete_data]
    // Imports the Google Cloud client library
    const { Spanner } = require('@google-cloud/spanner');

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const projectId = 'my-project-id';
    // const instanceId = 'my-instance';
    // const databaseId = 'my-database';

    // Creates a client
    const spanner = new Spanner({
      projectId: projectId,
    });

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

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

module.exports = Flight;