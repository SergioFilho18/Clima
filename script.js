document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if(input !==''){
        showWarning('Carregando...');
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=69ee5663f9396bde64e871fd90ab311e&units=metric&lang=pt-br`;

    let results = await fetch(url);
    let json = await results.json();

    console.log(json);

});

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}