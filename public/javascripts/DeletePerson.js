let DeletePersonBtn = document.getElementById("eliminar-btn");

DeletePersonBtn.addEventListener('click', () => {

    let FlightId = document.getElementById('FlighId').value;
    let BookingId = document.getElementById('BookingID').value;
    let PassId = document.getElementById('PassId').value;

    var urlencoded = new URLSearchParams();
    urlencoded.append("PassId", PassId);
    urlencoded.append("FlightId", FlightId);
    urlencoded.append("BookingId", BookingId);

    var requestOptions = {
        method: 'DELETE',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/api/person/2", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})