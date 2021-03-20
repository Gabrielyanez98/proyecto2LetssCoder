getData();

function getData(){
    const url = "";
    fetch(url, {
        method: "GET",
        headers: {

        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        console.log(data);

        llamarFuncionPintarTabla(data);
        
    });
    
}