// URL base de la API

const API_URL = 'https://swapi.dev/api/';

//Elementos del DOM
const content = document.getElementById('content');
const buttons = document.querySelectorAll('nav button');
const itemSelector = document.getElementById('itemSelector');
const selectorContainer = document.getElementById('selectorContainer');

async function fetchData(endpoint) {
    try{
        const response = await fetch(API_URL+endpoint);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(`Fetched data from ${endpoint}`, data);
        return data.results;
        
    }catch(error){
        console.log('Error fetching data: ',error);
        return [];
    }
}

//Card para personajes

function createCharacterCard(character){
    const characterCard = document.createElement('div');
    characterCard.className = 'card'
    characterCard.innerHTML = `
    <h2>${character.name}</h2>
    <p>Altura: ${character.height} cm</p>
    <p>Peso: ${character.mass} Kg</p>
    <p>Año de nacimiento: ${character.birth_year}</p>
    <p>Genero: ${character.gender}</p>
    <p>Color de ojos: ${character.eye_color}</p>
    `
    return characterCard;    
}

//Card para planetas

function createPlanetCard(planet){
    const planetCard = document.createElement('div');
    planetCard.className = 'card'
    planetCard.innerHTML = `
    <h2>${planet.name}</h2>
    <p>Clima: ${planet.climate}</p>
    <P>Tipo de terreno: ${planet.terrain} </P>
    <p>Gravedad: ${planet.gravity}</p>
    <p>Periodo Orbital: ${planet.orbital_period} dias</p>
    <p>Periodo de rotacion: ${planet.rotation_period} horas</p>
    <p>Superficie de agua: ${planet.surface_water}%</p>
    `
    return planetCard;  
}

//Card para naves

function createStarshipCard(starship){
    const shipCard = document.createElement('div');
    shipCard.className = 'card'
    shipCard.innerHTML = `
    <h2>${starship.name}</h2>
    <p>Modelo: ${starship. model}</p>
    <p>Tipo de nave: ${starship.starship_class}</p>
    <p>Personal necesario: ${starship.crew} personas</p>
    <p>Capacidad de pasajeros: ${starship.passengers} personas</p>
    <p>Capacidad de carga: ${starship.cargo_capacity}Kg</p>
    <p>Costo en creditos: ${starship.cost_in_credits} creditos galacticos</p>
    <p>Fabricante: ${starship.manufacturer}</p>
    `
    return shipCard;  
}

//Funcion para mostrar los datos

async function displayData(type){
    content.innerHTML = '';
    itemSelector.style.display = 'block';
    itemSelector.innerHTML = '<option value="" disabled selected>Seleccione un item</option>'

    const endpoint = type === 'characters' ? 'people' : type;
    console.log(`Fetching data for endpoint: ${endpoint}`); //opcional

    const data = await fetchData(endpoint);
    if(data.length === 0){
        itemSelector.innerHTML = '<option value="" disabled>No hay datos para mostrar</option>';
        return;
    }
    data.forEach(item =>{
        const option = document.createElement('option');
        option.value = item.url;
        option.textContent = item.name || item.title
        itemSelector.appendChild(option);
    })
    itemSelector.onchange = async function (){
        const url = this.value;
        const response = await fetch(url);
        const item = await response.json();
        content.innerHTML = '';

        let card;
        if (type === 'people'){
            card = createCharacterCard(item);
        }else if (type === 'planets'){
            card = createPlanetCard(item);
        }else if (type === 'starships'){
            card = createStarshipCard(item);
        }

        if(card){
            content.appendChild(card);
        }else{
            console.error('Error: card undefined');
        }
     }
    
}

//Agregar eventos a los botones
buttons.forEach(button =>{
    button.addEventListener('click', (event) =>{
        const type = event.target.id === 'characters' ? 'people' : event.target.id;
        displayData(type);
    })
})