// adiciona um evento no elemento com a classe busca
document.querySelector('.busca').addEventListener

// defini o inicio do evento com a ação de 'submit'(enviar) e cria uma arrow function async(assincrona, que não depende das outras funções para iniciar) que recebe o parametro event
('submit', async (event)=>{

    // executa a função preventDefault(que bloqueia o comportamento padrão que aconteceria com o evento(o acontecimento padrão seria de reiniciar a página))
    event.preventDefault();

    // define a variavel input como o valor inserido no elemento com o id 'searchInput' selecionado
    let input = document.querySelector("#searchInput").value;

    // condicional, se a variavel input tiver o valor diferente de '' vazio
    if(input !==''){

        // executa a função clearInfo
        clearInfo();

        // executa a função showWarning enviando o parametro 'Carregando...'
        showWarning('Carregando...');

    // define a variavel url como a URL da API que iremos consumir, 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=69ee5663f9396bde64e871fd90ab311e&units=metric&lang=pt-br`;
        //${encodeURI(input)}: Aqui, o valor de input está sendo interpolado na string. encodeURI é usado para garantir que qualquer caractere especial na string de entrada seja codificado corretamente para ser parte de uma URL válida.
            //&appid=69ee5663f9396bde64e871fd90ab311e: Esta é a chave de API (appid) associada à sua conta no OpenWeatherMap. Certifique-se de manter sua chave privada e não compartilhá-la publicamente.
                //&units=metric: Parâmetro que especifica a unidade de medida para as informações de temperatura, neste caso, em Celsius.
                    //&lang=pt-br: Parâmetro que especifica o idioma das informações retornadas pela API. Neste caso, é definido como português brasileiro.

    // define a variavel results como a resposta(promise) da requisição feita e armazenada na variavel url (await serve para esperar a requisição ser feita e ser obtido a resposta antes de ir para a próxima linha de código)
    let results = await fetch(url);

    // define a variavel json como a resposta(promise) armazenada na variavel results e transformada em um JSON pela função json()(await serve para esperar a resposta ser transformada em json e ser armazenada na variavel antes de ir para próxima linha de código)
    let json = await results.json();

    // condicional, verifica se json.cod é igual a 200, ou seja, se a requisição retornou uma resposta com sucesso (200 em HTTPS significa que a requisição e retorno foram concluídas com sucesso)
    if(json.cod === 200) {
        // executa a função showInfo
        showInfo({
            // define a propriedade name como a propriedade name da variavel json
            name: json.name,
            // define a propriedade country como a propriedade sys.country da variavel json
            country: json.sys.country,
            // define a propriedade temp como a propriedade main.temp da variavel json
            temp: json.main.temp,
            // define a propriedade tempIcon como a propriedade weather[0].icon da variavel json
            tempIcon: json.weather[0].icon,
            // define a propriedade windSpeed como a propriedade wind.speed da variavel json
            windSpeed: json.wind.speed,
            // define a propriedade windAngle como a propriedade wind.deg da variavel json
            windAngle: json.wind.deg

        });
    } else { // se a condicional, for negada, ou seja, se a requisição não retornar uma resposta, entao:

        // executa a função clearInfo
        clearInfo();

        // executa a função showWarning enviando o parametro '...'
        showWarning('Não foi encontrada está localidade');
    }
} else { // condicional, se a variavel input tiver o valor igual a '' vazio

    // executa a função de clearInfo()
    clearInfo();
}

}); // finaliza o evento adicionado no elemento com a classe de busca

// inicializa a função showInfo que recebe como parametro a variavel json
function showInfo(json) {

    // executa a função showWarning enviando parametro ''
    showWarning('');

    // define o style display do elemento selecionado como 'block'
    document.querySelector('.resultado').style.display = 'block';

    // define o innerHTML do elemento selecionado como template string de json.name e json.country
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;

    // define o innerHTML do elemento selecionado como template string de json.temp e tag sup
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;

    // define o innerHTML do elemento selecionado como template string de json.windSpeed e tag span
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    // seta o atributo src do elemento selecionado como 'link da imagem com o template string do icon selecionado'
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    // define o style transform do elemento selecionado como 'rotate com o template string do angulo (-90 para arrumar a posição inicial)'
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
} // termina a função showInfo

// inicializa a função clearInfo
function clearInfo(){

    // executa a função showWarning enviando um parametro vazio
    showWarning('');

    // define o style display do elemento selecionado para none
    document.querySelector('.resultado').style.display = 'none';
} // finaliza a função clearInfo

// inicializa a função showWarning e recebe como parametro 'msg'
function showWarning(msg) {

    // define o innerHTML do elemento selecionado como o parametro recebido pela função
    document.querySelector('.aviso').innerHTML = msg;
}