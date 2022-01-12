
const database = require('../database/config')();

var Booking = function () {

    return {

        readData: async function () {
            // [START spanner_read_data]
            const query = {
                sql: 'Select * FROM Bookings'
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
                throw ("error in readData function in Bookings", err)
            } 
            // [END spanner_read_data]
        },

        readDataOne: async function (bookingId) {
            // [START spanner_read_data]
            const query = {
                sql: `Select * FROM Bookings Where BookingId = ${bookingId}`
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
                throw ("error in readData function in Bookings", err)
            } 
            // [END spanner_read_data]
        },

        insertData: async function (flightid, bookingId, bookdate) {


            // Instantiate Spanner table objects
            const flightsTable = database.table('Bookings');

            // Inserts rows into the Singers table
            // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
            // they must be converted to strings before being inserted as INT64s
            try {
                await flightsTable.insert([
                    { FlightId: flightid, BookingId: bookingId, Bookdate: bookdate }
                ]);

                console.log('Inserted data in the table Booking');
            } catch (err) {
                console.error('ERROR:', err);
            }
            // [END spanner_insert_data]
        },
    }
}

module.exports = Booking;