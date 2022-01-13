
let obtenerPassId = document.getElementById("Buscar-btn");

function obtenerPersonId(evento ) {

    let textPersonId = document.getElementById("txt-PersonId").value;
    
    window.location.pathname = `/mi-viaje/${textPersonId}`;

}
