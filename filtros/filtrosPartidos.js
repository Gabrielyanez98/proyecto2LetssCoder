getData();

function getData() {
    const url = "https://api.football-data.org/v2/competitions/2014/matches";

    mostrarSpinner();

    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "793c975614a3474db9c0a808a4b6850a"
        }
    }).then(response => {
        if (response.ok) return response.json();
    }).then(data => {
        document.addEventListener("DOMContentLoaded", listaPartidos(data.matches));
        console.log(data);
        
        
        //listaPartidos(data);
        
       
         
        document.addEventListener("click", filtrar(data.matches));
       
        //Filtro partidos Terminados
        filtroPartidosTerminados = data.matches.filter(function (element) { return element.status == "FINISHED"; });

        //Filtro partidos por jugar
        filtroPartidosPorJugar = data.matches.filter(function (element) { return element.status == "SCHEDULED"; });

    })


}


// Función que muestra el filtro de partidos terminados y por jugar según si el usuario ha seleccionado un radio-button o el otro.
document.addEventListener("click", mostrarSeleccionCompleta);

function mostrarSeleccionCompleta() {
   //mostrarSpinner();
    if (document.querySelector("[value=finalizados]").checked) {
        eliminarTabla();
        listaPartidos(filtroPartidosTerminados);
    } else if (document.querySelector("[value=porJugar]").checked) {
        eliminarTabla();
        listaPartidos(filtroPartidosPorJugar);
    }
}



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


        //Condicional que se encarga de filtrar lo que desea buscar el usuario
        if (equipoLocal.toLowerCase().indexOf(equipo.toLowerCase()) !== -1 || equipoVisitante.toLowerCase().indexOf(equipo.toLowerCase()) !== -1) {

            //Esta función definida más adelante genera una tabla estándard en base a los que le pasemos por parámetros
            mostrarSeleccionEquipos(idEquipoLocal, equipoLocal, golesEquipoLocal, golesEquipoVisitante, idEquipoVisitante, equipoVisitante);

        }

        // Serie de condicionales que según el radio-button seleccionado hará un filtro u otro en base al equipo que el usuario desee consultar
        if (document.querySelector("[value=todos]").checked) {
            eliminarTabla();
            listaPartidos(partidos);
        } else if (document.querySelector("[value=victorias]").checked) {
            eliminarTabla();
            filtrarEquipoVictorias(partidos);
        } else if (document.querySelector("[value=derrotas]").checked) {
            eliminarTabla();
            filtrarEquipoDerrotas(partidos);
        } else if (document.querySelector("[value=empates]").checked) {
            eliminarTabla();
            filtrarEquipoEmpates(partidos);
        }


        //En caso de que la búsqueda esté vacía se mostrará siempre la tabla completa.
        if (equipo = "") {
            listaPartidos(data.matches)
        }
        //En caso de se busque un equipo que no existe no se podrá generar ninguna tabla por lo que mandaremos un mensaje de error al no haber ninguna tabla.
    }
    if (!tabla.firstChild) {
        mensajeError();
    } else {
        let error = document.querySelector("#mensajeError");
        error.removeChild(error.firstChild);
    }   

    let miSpinner = document.querySelector("#miSpinner");
    if(tabla.firstChild){
        miSpinner.removeChild(miSpinner.firstChild);
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
    //console.log(partidos[0].homeTeam.name)
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
    if (equipo == "") {
        
        listaPartidos(data.matches);
    }
}

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
    if (equipo == "") {
        
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


function mostrarSpinner(){
    eliminarTabla();
    
    let miSpinner = document.querySelector("#tabla");
    
    
    let spinner = document.createElement("div");
    spinner.classList.add('spinner');

    spinner.innerHTML = `
    <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
    `;
    
    miSpinner.appendChild(spinner)
    
    
    
    

    
}