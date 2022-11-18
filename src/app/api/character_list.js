import { drawCharDetail } from './character_detail.js';

const charList = document.getElementById('charList');
const requestChar = async() => {
    const charRequests = [];
    for (let i = 1; i <= 23; i++) {
        const promiseChar = fetch('https://fedeperin-harry-potter-api.herokuapp.com/personajes/' + i).then(res => res.json());
        charRequests.push(promiseChar);  
    }
    Promise.all(charRequests).then(results => {
        results.forEach((char, index) => {
            drawChar(char, index + 1);
        });
    })
};

const drawChar = (char, id) => {
    const charDiv = createCharDiv(char, id);
    charDiv.addEventListener('click', () => drawCharDetail(id));
    charList.appendChild(charDiv);

};


function createCharDiv(char, id) {

    const personaje = document.createElement('h3');
    personaje.textContent = char.personaje;
    const apodo = document.createElement('h3');
    apodo.textContent = char.apodo;
    const casaDeHogwarts = document.createElement('h3');
    casaDeHogwarts.textContent = char.casaDeHogwarts;
    const imagen = document.createElement('img');
    if (char.personaje.includes("McGonagall")) {
        char.personaje = char.personaje.replace(/McGonagall/, "McGonnagall")
    }
    if (char.personaje.includes("Dumbledore")) {
        char.personaje = char.personaje.replace(/ Percival Wulfric Brian /, " ")
    }
    let imgname = char.personaje.toLowerCase().replace(/ [a-z]* | /, '_');

    imagen.src=`https://raw.githubusercontent.com/fedeperin/harry-potter-api/main/imagenes/${imgname}.png`;
    const charDiv = document.createElement('div');
    charDiv.appendChild(personaje);
    charDiv.appendChild(apodo);
    charDiv.appendChild(casaDeHogwarts);
    charDiv.appendChild(imagen);
    charDiv.classList.add('char__elem');
    

    if (char.casaDeHogwarts === "Gryffindor") {
        charDiv.classList.add("char__gr"); 
        } else if (char.casaDeHogwarts === "Slytherin") {
        charDiv.classList.add("char__sl");
        } else if (char.casaDeHogwarts === "Ravenclaw") {
        charDiv.classList.add("char__ra");
        } else if (char.casaDeHogwarts === "Hufflepuff") {
        charDiv.classList.add("char__hu");
        } else if (char.casaDeHogwarts === "ninguna") {
        charDiv.classList.add("char__no");
    }
  return charDiv;
}


export { createCharDiv };
export { requestChar };