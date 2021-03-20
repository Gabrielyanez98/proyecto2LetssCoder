/*
getData();

function getData(){
    const url = "https://api.football-data.org/v2/competitions/2014/matches";
    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token" : "793c975614a3474db9c0a808a4b6850a"
        }
    }).then(response => {
        if (response.ok) return response.json();
    }).then(data => {
        console.log(data);

        listaPartidos(data);
    })
    
}*/

//console.log(data);
function listaPartidos(partidos){

let d = document;

for (var i = 0; i < partidos.length; i++) {
  let generateTable = d.getElementById("tabla");
  let contentGenerate = d.createElement("tr");


  if (partidos[i].status != "FINISHED" && partidos[i].status != "FINISHED"){
    partidos[i].score.fullTime.awayTeam = "Por jugar";
    partidos[i].score.fullTime.homeTeam = "Por jugar";
  };
  
    contentGenerate.innerHTML = `
  <td><img src="https://crests.football-data.org/${partidos[i].homeTeam.id}.svg" class="fotoIconos"> ${partidos[i].homeTeam.name}</td>
  <td> ${partidos[i].score.fullTime.homeTeam} </td> 
  <td>  ${partidos[i].score.fullTime.awayTeam}</td> 
  <td> <img src="https://crests.football-data.org/${partidos[i].awayTeam.id}.svg" class="fotoIconos">${partidos[i].awayTeam.name}</td>
  `;
  
  generateTable.append(contentGenerate);

}
}

//listaPartidos(data.matches);


























