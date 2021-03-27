
getData();

function getData(){
    const url = "https://api.football-data.org/v2/competitions/2014/standings";
    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token" : "793c975614a3474db9c0a808a4b6850a"
        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        console.log(data);

        clasificacion(data.standings[0].table);
    });
}




function clasificacion(partidos){

for (let i = 0; i < partidos.length; i++){
    let generateTable = document.getElementById("tabla");
    let contentGenerate = document.createElement("tr");

      contentGenerate.innerHTML = `<td><img  src="https://crests.football-data.org/${partidos[i].team.id}.svg" class="fotoIconos"> ${partidos[i].team.name}</td>
      <td>${partidos[i].points}</td> 
      <td>${partidos[i].won}</td> 
      <td>${partidos[i].draw}</td> 
      <td>${partidos[i].lost}</td> 
      <td>${partidos[i].goalsFor}</td> 
      <td>${partidos[i].goalsAgainst}</td> 
   `;

    generateTable.append(contentGenerate);
}
}