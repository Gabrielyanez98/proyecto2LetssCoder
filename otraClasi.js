
// Llamo a la función que imprime la tabla de todos los partidos jugados
document.addEventListener("DOMContentLoaded", listaPartidos(data.matches))

//Filtro general según el equipo seleccionado
function filtrar(partidos) {

    eliminarTabla();

    for (let i = 0; i < partidos.length; i++) {
        let equipo = document.getElementById("buscador").value;

        let equipoVisitante = partidos[i].awayTeam.name;
        let idEquipoVisitante = partidos[i].awayTeam.id;
        let equipoLocal = partidos[i].homeTeam.name;
        let idEquipoLocal = partidos[i].homeTeam.id;
        let golesEquipoLocal = partidos[i].score.fullTime.homeTeam;
        let golesEquipoVisitante = partidos[i].score.fullTime.awayTeam;

        

        if (equipoLocal.toLowerCase().indexOf(equipo.toLowerCase()) !== -1 || equipoVisitante.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {

            mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);

        } 
        if(equipo = ""){
            listaPartidos(data.matches)
            console.log("hola")
        }

    }
    if (!tabla.firstChild) {
        mensajeError();
    }
}

// Función que crea la tabla estándard sin hacer uso de un loop, por lo que será necesario crear un loop que incluya esta función cuyas variables tengan el mismo nombre que los parámtros de esta función
function mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante) {

    let generateTable = document.getElementById("tabla");

    let contentGenerate = document.createElement("tr");

    contentGenerate.innerHTML = `
<td><img src="https://crests.football-data.org/${idEquipoLocal}.svg" class="fotoIconos"> ${equipoLocal}</td>
<td> ${golesEquipoLocal} </td> 
<td>  ${golesEquipoVisitante}</td> 
<td> <img src="https://crests.football-data.org/${idEquipoVisitante}.svg" class="fotoIconos">${equipoVisitante}</td>
`;

    generateTable.appendChild(contentGenerate);
}


document.addEventListener("click", mostrarSeleccionCompleta);

//Función que activa los filtros según el "radio-button" que seleccione el usuario
function mostrarSeleccionCompleta() {
    if (document.querySelector("[value=todos]").checked) {
        eliminarTabla();
        listaPartidos(data.matches);
    } else if (document.querySelector("[value=finalizados]").checked) {
        eliminarTabla();
        listaPartidos(filtroPartidosTerminados);
    } else if (document.querySelector("[value=porJugar]").checked) {
        eliminarTabla();
        listaPartidos(filtroPartidosPorJugar);
    } else if (document.querySelector("[value=victorias]").checked) {
        //eliminarTabla();
        filtrarEquipoVictorias(data.matches);
    } else if (document.querySelector("[value=derrotas]").checked) {
        eliminarTabla();
        filtrarEquipoDerrotas(data.matches);
    } else if (document.querySelector("[value=empates]").checked) {
        eliminarTabla();
        filtrarEquipoEmpates(data.matches);
    }
}

//Filtro partidos Terminados
let filtroPartidosTerminados = data.matches.filter(function (element) { return element.status == "FINISHED"; });

//Filtro partidos por jugar
let filtroPartidosPorJugar = data.matches.filter(function (element) { return element.status == "SCHEDULED";});

// Función para eliminar la tabla
function eliminarTabla() {
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }

}

// Filtro por victorias
function filtrarEquipoVictorias(partidos) {

    eliminarTabla();
    let equipo;
    for (let i = 0; i < partidos.length; i++) {
         equipo = document.getElementById("buscador").value;
          
        let equipoVisitante = partidos[i].awayTeam.name;
        let idEquipoVisitante = partidos[i].awayTeam.id;
        let equipoLocal = partidos[i].homeTeam.name;
        let idEquipoLocal = partidos[i].homeTeam.id;
        let golesEquipoLocal = partidos[i].score.fullTime.homeTeam;
        let golesEquipoVisitante = partidos[i].score.fullTime.awayTeam;
        
        
        if (equipoLocal.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {
            if (partidos[i].score.winner == "HOME_TEAM") {
                mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);
            }
        }
        
        if (equipoVisitante.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {
            if (partidos[i].score.winner == "AWAY_TEAM") {
                mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);
            }
        }   
       
    }
    if(equipo == ""){
        eliminarTabla();
        listaPartidos(data.matches);
    }
}    
    
    
    /*if (!tabla.firstChild) {
        mensajeError();
    }*/

// Filtro por derrotas
function filtrarEquipoDerrotas(partidos) {

    eliminarTabla();
    let equipo;
    for (let i = 0; i < partidos.length; i++) {
         equipo = document.getElementById("buscador").value;

        let equipoVisitante = partidos[i].awayTeam.name;
        let idEquipoVisitante = partidos[i].awayTeam.id;
        let equipoLocal = partidos[i].homeTeam.name;
        let idEquipoLocal = partidos[i].homeTeam.id;
        let golesEquipoLocal = partidos[i].score.fullTime.homeTeam;
        let golesEquipoVisitante = partidos[i].score.fullTime.awayTeam;

        if (equipoVisitante.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {
            if (partidos[i].score.winner == "HOME_TEAM") {
                mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);
            }
        }
        if (equipoLocal.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {
            if (partidos[i].score.winner == "AWAY_TEAM") {
                mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);
            }
        }
    }
    if(equipo == ""){
        eliminarTabla();
        listaPartidos(data.matches);
    }
}

// Filtro por empates
function filtrarEquipoEmpates(partidos) {

    eliminarTabla();
    
    for (let i = 0; i < partidos.length; i++) {
        let equipo = document.getElementById("buscador").value;

        let equipoVisitante = partidos[i].awayTeam.name;
        let idEquipoVisitante = partidos[i].awayTeam.id;
        let equipoLocal = partidos[i].homeTeam.name;
        let idEquipoLocal = partidos[i].homeTeam.id;
        let golesEquipoLocal = partidos[i].score.fullTime.homeTeam;
        let golesEquipoVisitante = partidos[i].score.fullTime.awayTeam;

        if (equipoLocal.toLowerCase().indexOf(equipo.toLowerCase()) !== -1 || equipoVisitante.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {
            if (partidos[i].score.winner == "DRAW") {
                mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);
            }
        }

    }
    
}

// Función que muestra un mensaje de error en caso de que tras la búsqueda del usuario no se encuentre ningún equipo
function mensajeError() {
    let equipo = document.getElementById("buscador").value;
    let error = document.querySelector("#mensajeError");
    let mensaje = document.createElement("p");
    mensaje.innerHTML = `¡Hubo un error inesperado! no se ha podido encontrar el equipo: <strong>  "${equipo}" </strong>`;
    error.appendChild(mensaje);
    error.classList.add("estiloMensajeError");
}