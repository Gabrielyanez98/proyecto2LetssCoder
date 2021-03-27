



getData();

function datos(){
  const url = "https://api.football-data.org/v2/competitions/2014/standings";
    fetch(url, {
        method: "GET",
        headers: {
          "X-Auth-Token": "793c975614a3474db9c0a808a4b6850a"
        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        console.log(data);
        
        estadisticas(dataPartidos, data);
        
    });
}

let dataPartidos;
function getData(){
    const url = "https://api.football-data.org/v2/competitions/2014/matches";
    fetch(url, {
        method: "GET",
        headers: {
          "X-Auth-Token": "793c975614a3474db9c0a808a4b6850a"
        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        console.log(data);
        dataPartidos = data;
        //estadisticas(data, );
        datos();
    });
    
}


function estadisticas(data, team) {
  //Cálculo número de partidos empatados
  let d = document;
  let matches = data.matches.slice(0, data.length);
  let teams = team.standings[0].table;

  let empates = [];
  //Recorro el array de todos los partidos y busco generar un array nuevo que únicamente me saque los partidos empatados, mostraré el total de partidos empatados haciendo uso del .length porqué el total de elementos del array equivale al total de partidos empatados
  for (var i = 0; i < matches.length; i++) {
    if (matches[i].score.fullTime.homeTeam = matches[i].score.fullTime.awayTeam) {
      empates.push(matches[i].score.fullTime.homeTeam);
    }
  }

  //Genero un nuevo array en el que almacenaré cada partido en un elemento
  let totalPartidos = [];
  for (var i = 0; i < matches.length; i++) {
    if(matches[i].status == "FINISHED"){
    totalPartidos.push(matches[i]);
    }
  }
  console.log(totalPartidos)
  //Obtengo el porcentaje de empates dividiendo el total de elementos de los arrays creados anteriormente y lo multiplico por 100 para obtener el porcentaje deseado
  let porcentajeEmpates = (empates.length / totalPartidos.length) * 100;
  //Al obtener un número con tantos decimales utilizo el método toFixed para mostrar únicamente un porcentaje con dos decimales
  let empateConDecimal = porcentajeEmpates.toFixed(2);





  //Cálculo equipo/s que más goles han marcado

  let GolesMarcados = [];
  let arraydeEquipos = [];

  //Creo dos arrays, en el primero coloco el total de goles que ha marcado cada equipo, en el segundo array coloco el nombre de cada equipo
  for (var i = 0; i < teams.length; i++) {
    GolesMarcados.push(teams[i].goalsFor);
    arraydeEquipos.push(teams[i].team.name);
  }

  //Como ambos arrays por defecto tendrán el mismo orden, pues el nombre de cada club se encontrará siempre en la misma posición que los goles que marcó, creo una variable (posicionEquipo) en la que se almacenará la posición en la que se encuentra el  número de goles que estoy buscando, en este caso el número más alto que indica el más goleador.
  for (var i = 0; i < GolesMarcados.length; i++) {
    equipoGolesMarcados = Math.max.apply(null, GolesMarcados);
  }
  let posicionEquipo = GolesMarcados.indexOf(equipoGolesMarcados);
  console.log(posicionEquipo)

  //A continuación almaceno en una variable el nombre del equipo que se encuentra en la posición que almacené en la variable anterior (posicionEquipo), de esta forma la variable que estoy creando recibirá el nombre del equipo que ha marcado el número de goles que le corresponde gracias a que la variable "posicionEquipo" coincidirá siempre con la posición del nombre del club que marcó los goles correespondientes, gracias, repito, a que por defecto nos vendrá ordenado en el propio objeto tanto el nombre del club como los goles marcados.
  let nombreEquipoGoleador;
  nombreEquipoGoleador = arraydeEquipos[posicionEquipo];

  //Una vez tenemos el nombre del equipo que queremos mostrar en pantalla mediante un condicional busco su icono que se reserva en un identificador (id), por lo que al coincidir la variable "nombreEquipoGoleador" con lo que hay en el string del objeto teams[i].team.name me sacará únicamente el identificador del equipo en cuestión.
  let iconoClubGoleador;
  for (let i = 0; i < teams.length; i++) {
    if (nombreEquipoGoleador == teams[i].team.name) {
      iconoClubGoleador = teams[i].team.id;
    }
  }





  //Busco el segundo equipo que más goles ha marcado.

  //A continuación busco eliminar el número más alto que es el que corresponde al equipo más goleador, pues se trata de un número que ya no lo necesitaré dentro del array, y de esta forma podré volver a acceder al número más alto del nuevo array que en este caso se corresponderá con el segundo equipo que más goles marcó. De esta forma sigo una mecánica similar a la anterior y que voy a seguir utilizando para obtener los 5 clubs que más goles marcaron de forma ordenada. Lo mismo haré más adelante en el caso de los equipos que más goles recibieron y los equipos que más partidos empataron.


  //Para poder eliminar el número más alto de goles utilizo el método splice() pasándole por parámetro la posición donde se encuentra el número de goles que quiero eliminar (en este caso el más alto) y pasándole como segundo parámetro el número 1 para eliminarlo del array, y entonces el array en el que almacenaba todos los goles ("GolesMarcados") se verá reducido en un elemento (en este caso el de mayor número de goles). De la misma forma elimino del array de los equipos ("arraydeEquipos") el nombre del equipo más goleador accediendo a su posición obtenida anteriormente ("posicionEquipo")
  let eliminarPrimerGoleador = GolesMarcados.splice(posicionEquipo, 1)

  let eliminarNombrePrimerGoleador = arraydeEquipos.splice(posicionEquipo, 1);
  //Seguidamente mediante el método Matx.max.apply() obtengo el número mayor de goles (a nivel global el segundo número mayor de goles) del mismo array pero que ahora dispone de un elemento menos porqué le hemos eliminado el elemento en que se encontraba anteriormente el número mayor de goles 
  let segundoEquipoGoleador = Math.max.apply(null, GolesMarcados);

  //Buscamos la posición en la que se encuentra el segundo equipo más goleador (con el nuevo array será el más goleador)
  let posicionSegundoEquipoGoleador = GolesMarcados.indexOf(segundoEquipoGoleador);
  //Ahora gracias a la posición podemos hallar el nombre del segundo equipo más goleador
  let nombreSegundoEquipoGoleador = arraydeEquipos[posicionSegundoEquipoGoleador];

  //Como tenemos el nombre del segundo equipo más goleador podemos acceder fácilmente al icono correspondiente accediendo a la propiedad de "id" que se indica en el objeto JSON.
  let iconoSegundoClubGoleador;
  for (let i = 0; i < teams.length; i++) {
    if (nombreSegundoEquipoGoleador == teams[i].team.name) {
      iconoSegundoClubGoleador = teams[i].team.id;
    }
  }




  //Busco el tercer equipo más goleador
  let eliminarSegundoGoleador = GolesMarcados.splice(posicionSegundoEquipoGoleador, 1)

  let eliminarNombreSegundoGoleador = arraydeEquipos.splice(posicionSegundoEquipoGoleador, 1);

  let tercerEquipoGoleador = Math.max.apply(null, GolesMarcados);


  let posicionTercerEquipoGoleador = GolesMarcados.indexOf(tercerEquipoGoleador);

  let nombreTercerEquipoGoleador = arraydeEquipos[posicionTercerEquipoGoleador];

  let iconoTercerClubGoleador;
  for (let i = 0; i < teams.length; i++) {
    if (nombreTercerEquipoGoleador == teams[i].team.name) {
      iconoTercerClubGoleador = teams[i].team.id;
    }
  }



  //Busco el cuarto equipo más goleador
  let eliminarTercerGoleador = GolesMarcados.splice(posicionTercerEquipoGoleador, 1)

  let eliminarNombreTercerGoleador = arraydeEquipos.splice(posicionTercerEquipoGoleador, 1);

  let cuartoEquipoGoleador = Math.max.apply(null, GolesMarcados);


  let posicionCuartoEquipoGoleador = GolesMarcados.indexOf(cuartoEquipoGoleador);

  let nombreCuartoEquipoGoleador = arraydeEquipos[posicionCuartoEquipoGoleador];

  let iconoCuartoClubGoleador;
  for (let i = 0; i < teams.length; i++) {
    if (nombreCuartoEquipoGoleador == teams[i].team.name) {
      iconoCuartoClubGoleador = teams[i].team.id;
    }
  }




  //Busco el quinto equipo más goleador
  let eliminarCuartoGoleador = GolesMarcados.splice(posicionCuartoEquipoGoleador, 1)

  let eliminarNombreCuartoGoleador = arraydeEquipos.splice(posicionCuartoEquipoGoleador, 1);

  let quintoEquipoGoleador = Math.max.apply(null, GolesMarcados);


  let posicionQuintoEquipoGoleador = GolesMarcados.indexOf(quintoEquipoGoleador);

  let nombreQuintoEquipoGoleador = arraydeEquipos[posicionQuintoEquipoGoleador];

  let iconoQuintoClubGoleador;
  for (let i = 0; i < teams.length; i++) {
    if (nombreQuintoEquipoGoleador == teams[i].team.name) {
      iconoQuintoClubGoleador = teams[i].team.id;
    }
  }



  //Cálculo equipo/s que más goles han recibido. 

  //El siguiento proceso es exactamente igual que el anterior, salvo que en este caso buscamos a los clubs que más goles han recibido, por lo que el cambio más significativo será que en vez de ir a la propiedad del objeto teams.[i].goalsFor iremos a la propiedad de teams[i].goalsAgainst


  let segundoArraydeEquipos = [];
  let GolesRecibidos = [];

  for (var i = 0; i < teams.length; i++) {
    GolesRecibidos.push(teams[i].goalsAgainst);
    segundoArraydeEquipos.push(teams[i].team.name);
  }

  let equipoGolesRecibidos;
  for (let i = 0; i < GolesRecibidos.length; i++) {
    equipoGolesRecibidos = Math.max.apply(null, GolesRecibidos);
  }
  let posicionEquipoMasGoleado = GolesRecibidos.indexOf(equipoGolesRecibidos);


  let nombreEquipoMasGoleado;
  nombreEquipoMasGoleado = segundoArraydeEquipos[posicionEquipoMasGoleado];

  let iconoClubGoleado;
  for (let i = 0; i < teams.length; i++) {
    if (nombreEquipoMasGoleado == teams[i].team.name) {
      iconoClubGoleado = teams[i].team.id;
    }
  }


  //Segundo equipo más goleado

  let eliminarPrimerGoleado = GolesRecibidos.splice(posicionEquipoMasGoleado, 1)

  let eliminarNombrePrimerGoleado = segundoArraydeEquipos.splice(posicionEquipoMasGoleado, 1);


  let segundoEquipoGoleado = Math.max.apply(null, GolesRecibidos);


  let posicionSegundoEquipoGoleado = GolesRecibidos.indexOf(segundoEquipoGoleado);

  let nombreSegundoEquipoGoleado = segundoArraydeEquipos[posicionSegundoEquipoGoleado];


  let iconoSegundoClubGoleado;
  for (let i = 0; i < teams.length; i++) {
    if (nombreSegundoEquipoGoleado == teams[i].team.name) {
      iconoSegundoClubGoleado = teams[i].team.id;
    }
  }


  //Tercer equipo más goleado


  let eliminarSegundoGoleado = GolesRecibidos.splice(posicionSegundoEquipoGoleado, 1)

  let eliminarNombreSegundoGoleado = segundoArraydeEquipos.splice(posicionSegundoEquipoGoleado, 1);


  let tercerEquipoGoleado = Math.max.apply(null, GolesRecibidos);


  let posicionTercerEquipoGoleado = GolesRecibidos.indexOf(tercerEquipoGoleado);

  let nombreTercerEquipoGoleado = segundoArraydeEquipos[posicionTercerEquipoGoleado];


  let iconoTercerClubGoleado;
  for (let i = 0; i < teams.length; i++) {
    if (nombreTercerEquipoGoleado == teams[i].team.name) {
      iconoTercerClubGoleado = teams[i].team.id;
    }
  }


  //Cuarto equipo más goleado


  let eliminarTercerGoleado = GolesRecibidos.splice(posicionTercerEquipoGoleado, 1)

  let eliminarNombreTercerGoleado = segundoArraydeEquipos.splice(posicionTercerEquipoGoleado, 1);


  let cuartoEquipoGoleado = Math.max.apply(null, GolesRecibidos);


  let posicionCuartoEquipoGoleado = GolesRecibidos.indexOf(cuartoEquipoGoleado);

  let nombreCuartoEquipoGoleado = segundoArraydeEquipos[posicionCuartoEquipoGoleado];


  let iconoCuartoClubGoleado;
  for (let i = 0; i < teams.length; i++) {
    if (nombreCuartoEquipoGoleado == teams[i].team.name) {
      iconoCuartoClubGoleado = teams[i].team.id;
    }
  }

  //Quinto equipo más goleado

  let eliminarCuartoGoleado = GolesRecibidos.splice(posicionCuartoEquipoGoleado, 1)

  let eliminarNombreCuartoGoleado = segundoArraydeEquipos.splice(posicionCuartoEquipoGoleado, 1);


  let quintoEquipoGoleado = Math.max.apply(null, GolesRecibidos);


  let posicionQuintoEquipoGoleado = GolesRecibidos.indexOf(quintoEquipoGoleado);

  let nombreQuintoEquipoGoleado = segundoArraydeEquipos[posicionQuintoEquipoGoleado];


  let iconoQuintoClubGoleado;
  for (let i = 0; i < teams.length; i++) {
    if (nombreQuintoEquipoGoleado == teams[i].team.name) {
      iconoQuintoClubGoleado = teams[i].team.id;
    }
  }


  //Partidos arbitrados por distintos árbitros

  //Para buscar los partidos arbitrados por "Valentín Pizarro" necesito recorrer dos arrays, primero el array de los partidos total jugados, y el segundo array en el que se almacenan los 4 árbitros, y gracias a un condicional puedo crear un array en cuyos elementos se almacene el nombre de "Valentín Pizarro", que posteriormente mostraré el total de partidos arbitrados por este árbitro mostrando la longitud del array mediante .length. Lo mismo hago con otros 4 árbitros.
  let arbitroValentin = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < matches[i].referees.length; j++) {
      if (matches[i].status == "FINISHED" && matches[i].referees[j].name == "Valentín Pizarro") {
        arbitroValentin.push("Valentín")
      }
    }
  }
 
  let arbitroJesus = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < matches[i].referees.length; j++) {
      if (matches[i].status == "FINISHED" && matches[i].referees[j].name == "Jesús Gil") {
        arbitroJesus.push("Jesús")
      }
    }
  }
  
  let arbitroJose = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < matches[i].referees.length; j++) {
      if (matches[i].status == "FINISHED" && matches[i].referees[j].name == "José Sánchez") {
        arbitroJose.push("José")
      }
    }
  }

  let arbitroCesar = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < matches[i].referees.length; j++) {
      if (matches[i].status == "FINISHED" && matches[i].referees[j].name == "César Soto") {
        arbitroCesar.push("César")
      }
    }
  }

  let arbitroJuan = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < matches[i].referees.length; j++) {
      if (matches[i].status == "FINISHED" && matches[i].referees[j].name == "Juan Martínez") {
        arbitroJuan.push("Juan")
      }
    }
  }



  //Cálculo equipos que más partidos han empatado
  //La metodología para mostrar el equipo que más partidos ha empatado es la misma que la utilizada para obtener los clubs que más goles marcaron y los que más goles recibieron, en este caso debemos acceder a otras propiedades del objeto en cuestión.


  let empatesPorEquipo = [];
  let arrayEquipos = [];
  
  for (i = 0; i < teams.length; i++) {
    arrayEquipos.push(teams[i].team.name);
    empatesPorEquipo.push(teams[i].draw);
  }

  let empatesTotalesDelEquipo;
  for (i = 0; i < empatesPorEquipo.length; i++) {
    empatesTotalesDelEquipo = Math.max.apply(null, empatesPorEquipo);
  }
  let posicionEquipoEmpate = empatesPorEquipo.indexOf(empatesTotalesDelEquipo);

  let equipoConMasEmpates;
  equipoConMasEmpates = arrayEquipos[posicionEquipoEmpate];

  let iconoClubMasEmpates;
  for (let i = 0; i < teams.length; i++) {
    if (equipoConMasEmpates == teams[i].team.name) {
      iconoClubMasEmpates = teams[i].team.id;
    }
  }


  //Segundo equipo con más empates


  let eliminarMasEmpates = empatesPorEquipo.splice(posicionEquipoEmpate, 1)

  let eliminarNombreMasEmpates = arrayEquipos.splice(posicionEquipoEmpate, 1);


  let segundoEquipoEmpates = Math.max.apply(null, empatesPorEquipo);


  let posicionSegundoEquipoEmpates = empatesPorEquipo.indexOf(segundoEquipoEmpates);

  let nombreSegundoEquipoEmpates = arrayEquipos[posicionSegundoEquipoEmpates];


  let iconoSegundoEquipoEmpates;
  for (let i = 0; i < teams.length; i++) {
    if (nombreSegundoEquipoEmpates == teams[i].team.name) {
      iconoSegundoEquipoEmpates = teams[i].team.id;
    }
  }


  //Tercer equipo con más empates

  let eliminarSegundoMasEmpates = empatesPorEquipo.splice(posicionSegundoEquipoEmpates, 1)

  let eliminarNombreSegundoMasEmpates = arrayEquipos.splice(posicionSegundoEquipoEmpates, 1);


  let tercerEquipoEmpates = Math.max.apply(null, empatesPorEquipo);


  let posicionTercerEquipoEmpates = empatesPorEquipo.indexOf(tercerEquipoEmpates);

  let nombreTercerEquipoEmpates = arrayEquipos[posicionTercerEquipoEmpates];


  let iconoTercerEquipoEmpates;
  for (let i = 0; i < teams.length; i++) {
    if (nombreTercerEquipoEmpates == teams[i].team.name) {
      iconoTercerEquipoEmpates = teams[i].team.id;
    }
  }


  //Cuarto equipo con más empates


  let eliminarTerceroMasEmpates = empatesPorEquipo.splice(posicionTercerEquipoEmpates, 1)

  let eliminarNombreTerceroMasEmpates = arrayEquipos.splice(posicionTercerEquipoEmpates, 1);


  let cuartoEquipoEmpates = Math.max.apply(null, empatesPorEquipo);


  let posicionCuartoEquipoEmpates = empatesPorEquipo.indexOf(cuartoEquipoEmpates);

  let nombreCuartoEquipoEmpates = arrayEquipos[posicionCuartoEquipoEmpates];


  let iconoCuartoEquipoEmpates;
  for (let i = 0; i < teams.length; i++) {
    if (nombreCuartoEquipoEmpates == teams[i].team.name) {
      iconoCuartoEquipoEmpates = teams[i].team.id;
    }
  }


  //Quinto equipo con más empates


  let eliminarCuartoMasEmpates = empatesPorEquipo.splice(posicionCuartoEquipoEmpates, 1)

  let eliminarNombreCuartoMasEmpates = arrayEquipos.splice(posicionCuartoEquipoEmpates, 1);


  let quintoEquipoEmpates = Math.max.apply(null, empatesPorEquipo);


  let posicionQuintoEquipoEmpates = empatesPorEquipo.indexOf(quintoEquipoEmpates);

  let nombreQuintoEquipoEmpates = arrayEquipos[posicionQuintoEquipoEmpates];


  let iconoQuintoEquipoEmpates;
  for (let i = 0; i < teams.length; i++) {
    if (nombreQuintoEquipoEmpates == teams[i].team.name) {
      iconoQuintoEquipoEmpates = teams[i].team.id;
    }
  }


  //Inserción de la tabla en mi HTML

  let generateTable = d.getElementById("tabla");
  let filaUno = d.createElement("tr");
  let filaDos = d.createElement("tr");
  let filaTres = d.createElement("tr");
  let filaCuatro = d.createElement("tr");
  let filaCinco = d.createElement("tr");
  filaUno.innerHTML = `
      <td> Empates: ${empates.length}  
       </td>
      <td> <img src="https://crests.football-data.org/${iconoClubGoleador}.svg" class="fotoIconos"> ${nombreEquipoGoleador}: ${equipoGolesMarcados}  </td>
      <td><img src="https://crests.football-data.org/${iconoClubGoleado}.svg" class="fotoIconos"> ${nombreEquipoMasGoleado}: ${equipoGolesRecibidos}  </td>
      <td>Valentín Pizarro: ${arbitroValentin.length}</td>
      <td><img src="https://crests.football-data.org/${iconoClubMasEmpates}.svg" class="fotoIconos">${equipoConMasEmpates}: ${empatesTotalesDelEquipo}</td>
    `;



  filaDos.innerHTML = `<td>Porcentaje: ${empateConDecimal}%</td> <td> <img src="https://crests.football-data.org/${iconoSegundoClubGoleador}.svg" class="fotoIconos"> ${nombreSegundoEquipoGoleador}: ${segundoEquipoGoleador}</td><td> <img src="https://crests.football-data.org/${iconoSegundoClubGoleado}.svg" class="fotoIconos"> ${nombreSegundoEquipoGoleado}: ${segundoEquipoGoleado}</td><td>Jesús Gil: ${arbitroJesus.length}</td><td><img src="https://crests.football-data.org/${iconoSegundoEquipoEmpates}.svg" class="fotoIconos">${nombreSegundoEquipoEmpates}: ${segundoEquipoEmpates}</td>`

  filaTres.innerHTML = `<td></td><td> <img src="https://crests.football-data.org/${iconoTercerClubGoleador}.svg" class="fotoIconos"> ${nombreTercerEquipoGoleador}: ${tercerEquipoGoleador}</td><td> <img src="https://crests.football-data.org/${iconoTercerClubGoleado}.svg" class="fotoIconos"> ${nombreTercerEquipoGoleado}: ${tercerEquipoGoleado}</td><td>José Sánchez: ${arbitroJose.length}</td><td><img src="https://crests.football-data.org/${iconoTercerEquipoEmpates}.svg" class="fotoIconos">${nombreTercerEquipoEmpates}: ${tercerEquipoEmpates}</td>`

  filaCuatro.innerHTML = `<td></td><td> <img src="https://crests.football-data.org/${iconoCuartoClubGoleador}.svg" class="fotoIconos"> ${nombreCuartoEquipoGoleador}: ${cuartoEquipoGoleador}</td><td> <img src="https://crests.football-data.org/${iconoCuartoClubGoleado}.svg" class="fotoIconos"> ${nombreCuartoEquipoGoleado}: ${cuartoEquipoGoleado}</td><td>César Soto: ${arbitroCesar.length}</td><td><img src="https://crests.football-data.org/${iconoCuartoEquipoEmpates}.svg" class="fotoIconos">${nombreCuartoEquipoEmpates}: ${cuartoEquipoEmpates}</td>`

  filaCinco.innerHTML = `<td></td><td> <img src="https://crests.football-data.org/${iconoQuintoClubGoleador}.svg" class="fotoIconos"> ${nombreQuintoEquipoGoleador}: ${quintoEquipoGoleador}</td><td> <img src="https://crests.football-data.org/${iconoQuintoClubGoleado}.svg" class="fotoIconos"> ${nombreQuintoEquipoGoleado}: ${quintoEquipoGoleado}</td><td>Juan Martínez: ${arbitroJuan.length}</td><td><img src="https://crests.football-data.org/${iconoQuintoEquipoEmpates}.svg" class="fotoIconos">${nombreQuintoEquipoEmpates}: ${quintoEquipoEmpates}</td>`

  generateTable.append(filaUno, filaDos, filaTres, filaCuatro, filaCinco);

}

