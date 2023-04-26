const weather_api_endpoint = 'http://api.weatherapi.com/v1/current.json';
const weather_api_key = '349479db9c5943a48fe110314231604';

const calendar_api_key = '392fdf387a7871e8b13464334120725f1501b423';
const calendar_endpoint = 'https://calendarific.com/api/v2/holidays';

let currentYear = new Date().getFullYear();

function onHolidaysJson(json) {
    let elem = [];
    let i = 0;

    console.log(json);

    const result = document.querySelector('#response-view');
    result.innerHTML = '';

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Holiday Calendar for ' + currentYear;

    const list = document.createElement('ul');
    document.body.appendChild(list);
    list.classList.add('list');
    list.innerHTML = '';

    holidays = json.response.holidays;
    for(h of holidays) {
        elem[i] = document.createElement('li');
        list.appendChild(elem[i]);
        elem[i].classList.add('list-item');
        elem[i].textContent = h.name + ': ' + h.date.iso;
        i++;
    }

    result.appendChild(title);
    result.appendChild(list);
}

function onWeatherJson(json) {
    console.log(json);

    const result = document.querySelector('#response-view');
    result.innerHTML = '';

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = json.location.name + ', ' + json.location.country;

    const list = document.createElement('ul');
    document.body.appendChild(list);
    list.classList.add('list');
    list.innerHTML = '';
    
    const image = document.createElement('img');
    image.src = json.current.condition.icon;
    list.appendChild(image);

    const elem1 = document.createElement('li');
    list.appendChild(elem1);
    elem1.classList.add('list-item');
    elem1.textContent = 'Conditions: ' + json.current.condition.text;

    const elem2 = document.createElement('li');
    list.appendChild(elem2);
    elem2.classList.add('list-item');
    elem2.textContent = 'Temperature: ' + json.current.temp_c + '°C';

    const elem3 = document.createElement('li');
    list.appendChild(elem3);
    elem3.classList.add('list-item');
    elem3.textContent = 'Cloud: ' + json.current.cloud + '%';

    const elem4 = document.createElement('li');
    list.appendChild(elem4);
    elem4.classList.add('list-item');
    elem4.textContent = 'Precipitation: ' + json.current.precip_mm + ' mm';

    const elem5 = document.createElement('li');
    list.appendChild(elem5);
    elem5.classList.add('list-item');
    elem5.textContent = 'Humidity: ' + json.current.humidity + '%';
    
    result.appendChild(title);
    result.appendChild(list);
}

function onReponse(response) {
    return response.json();
}

function onFailure(error) {
    console.error('Something went wrong: ' + error);
}

function search(event) {
    event.preventDefault();

    const content = document.querySelector('#content');
    const text = encodeURIComponent(content.value);
    const tipo = document.querySelector('#tipo').value;
    console.log('Eseguo ricerca di ' + tipo);

    switch(tipo) {
        case 'Weather':
            weather_request = weather_api_endpoint + '?key=' + weather_api_key + '&q=' + text;
            fetch(weather_request).then(onReponse, onFailure).then(onWeatherJson);
            break;

        case 'Holidays':
            calendar_request = calendar_endpoint + '?api_key=' + calendar_api_key + '&country=' + text + '&year=2023';
            fetch(calendar_request).then(onReponse, onFailure).then(onHolidaysJson);
            break;
    }
}

const form = document.querySelector('#search_content');
form.addEventListener('submit', search);