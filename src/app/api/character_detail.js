import { createCharDiv } from './character_list.js';

function requestCharDetail(id) {

    return fetch('https://fedeperin-harry-potter-api.herokuapp.com/personajes/' + id).then(res => res.json());
}



const drawCharDetail = async(id) => {

    const charDetail = await requestCharDetail(id);
    const backgroundDiv = document.createElement('div');
    backgroundDiv.classList.add('modal__background');
    const charDiv = createCharDiv(charDetail, id);
    charDiv.classList.add('char__detail');
    document.body.appendChild(backgroundDiv);
    document.body.appendChild(charDiv);
    backgroundDiv.addEventListener('click', () => {
        backgroundDiv.remove();
        charDiv.remove();
    });
    if (charDetail.hijos.length > 0) {
        const chi = document.createElement('p');
        chi.textContent = "Hijos:";
        const chil = document.createElement('ul');
        chil.classList.add("char__hijos");
        for (let i = 0; i < charDetail.hijos.length; i++) {
            const child = document.createElement('li');
            child.textContent = charDetail.hijos[i];
            chil.appendChild(child);
        }
        charDiv.appendChild(chi);
        charDiv.appendChild(chil);
    }
}
export { drawCharDetail };