let modificarBtn = document.getElementById('modificar-btn');

modificarBtn.addEventListener('click', () => {

    let FlightId = document.getElementById('FlightId');
    let BookingId = document.getElementById('BookingId');
    let PassId = document.getElementById('PassId');
    let Passname = document.getElementById('Passname');
    let PassEmail = document.getElementById('PassEmail');
    let PassDob = new Date();

    fetch(`/api/person/${FlightId}`,{
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({FlightId, BookingId, PassId, Passname, PassEmail,PassDob})
    }).then((res) => {

        let box = null;
        if (res.status != 200){
            box = document.getElementById("alert-danger-update");
        }else{
            box = document.getElementById("alert-success-update");
        }

        box.style.display = "block";
        setTimeout( () => box.style.display = "none !important",3000);
    });
    
})