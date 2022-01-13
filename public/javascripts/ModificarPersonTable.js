let modificarBtn = document.getElementById('modificar-btn');

modificarBtn.addEventListener('click', () => {

    let FlightId = document.getElementById('FlighId').value;
    let BookingId = document.getElementById('BookingID').value;
    let PassId = document.getElementById('PassId').value;
    let Passname = document.getElementById('Passnme').value;
    let PassEmail = document.getElementById('PassEmail').value;
    let PassDob = new Date().toISOString().split("T")[0];

    var urlencoded = new URLSearchParams();
    urlencoded.append("FlightId", FlightId);
    urlencoded.append("BookingId", BookingId);
    urlencoded.append("PassId", PassId);
    urlencoded.append("Passname", Passname);
    urlencoded.append("PassEmail", PassEmail);
    urlencoded.append("PassDob", PassDob);

    var requestOptions = {
        method: 'PUT',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/api/person/${FlightId}`, requestOptions)
        .then((res) => {

            let box = null;
            if (res.status != 200) {
                box = document.getElementById("alert-danger-update");
            } else {
                box = document.getElementById("alert-success-update");
            }
    
            box.style.display = "block";
            setTimeout(() => box.style.display = "none !important", 3000);
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})