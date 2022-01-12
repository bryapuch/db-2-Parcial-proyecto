
------------------ Tabla Vuelo ------------------
CREATE TABLE Flights (
  FlightId INT64 NOT NULL,
  FlightSource STRING(1024),
  FlightDest STRING(1024),
  FlightDate DATE,
  FlightSeat INT64 NOT NULL,
  TicketCost FLOAT64 NOT NULL,
) PRIMARY KEY(FlightId);

------------------ Tabla Reserva ------------------
CREATE TABLE Bookings (
  FlightId INT64 NOT NULL,
  BookingId INT64 NOT NULL,
  Bookdate DATE,
) PRIMARY KEY(FlightId, BookingId),
  INTERLEAVE IN PARENT Flights ON DELETE CASCADE;

------------------ Table Persona ------------------
CREATE TABLE Persons (
  FlightId INT64 NOT NULL,
  BookingId INT64 NOT NULL,
  PassId INT64 NOT NULL,
  Passname STRING(1024),
  PassEmail STRING(1024),
  PassDob DATE,
) PRIMARY KEY(FlightId, BookingId, PassId),
  INTERLEAVE IN PARENT Bookings ON DELETE CASCADE;
