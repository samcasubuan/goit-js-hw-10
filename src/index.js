import { fetchBreeds, fetchCatByBreed } from './cat-api';

// --------------------------------------------------------

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

// -----------------------------------------------------------
// for creating the option values
function chooseBreed(data) {
  fetchBreeds(data)
    .then(data => {
      // console.log(data);
      loaderEl.classList.replace('loader', 'is-hidden');

      let optionsMarkup = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });

      breedSelectEl.insertAdjacentHTML('beforeend', optionsMarkup);
    })
    .catch(onError);
}
chooseBreed();

// -------------------------------------------------------------------

function createMarkup(event) {
  // show loader while loading
  loaderEl.classList.replace('is-hidden', 'loader');
  // hide select element and cat info markup while loading
  breedSelectEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');

  const breedId = event.target.value;
  // get the option value using event.target.value
  // condole.log(event.target);
  // console.log(event.target.value);

  fetchCatByBreed(breedId)
    .then(data => {
      loaderEl.classList.replace('loader', 'is-hidden');
      breedSelectEl.classList.remove('is-hidden');

      // console.log(data);
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `<img src = "${url}" alt="${name}" width = "400"/>
    <div class = "box">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p></div>
    `;
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(onError);
}
breedSelectEl.addEventListener('change', createMarkup);

// --------------------------------------------------------------

function onError() {
  // show error messege
  errorEl.classList.remove('is-hidden');
  // hide select element
  breedSelectEl.classList.add('is-hidden');
}
