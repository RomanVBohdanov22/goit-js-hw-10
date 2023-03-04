import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputLnk = document.querySelector('input#search-box');
const countryListLnk = document.querySelector('.country-list');
const countryInfoLnk = document.querySelector('.country-info');

inputLnk.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  e.preventDefault();
  resetPanels();
  let countryName = e.target.value.trim();
  if (countryName.length) {

    fetchCountries(countryName)
      .then(data => {
        // Data handling
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        renderCoutries(data);
      })
      .catch(error => {
        Notify.failure(`Oops, there is no country with that name`);
        console.log(error);
        // Error handling
      });
  }
}

function resetPanels() { 
  countryListLnk.innerHTML = '';
  countryInfoLnk.innerHTML = '';
}
function renderCoutries(data) {
  if (data.length === 1) {
    renderOneCountry(data);
  } else renderCountriesTable(data);
}

function renderOneCountry([data]) {
  const countryName = data.name.official;
  const countryCapital = data.capital;
  const countryFlag = data.flags.svg;
  const countryFlagAlt = data.flags.alt;
  const countryPopulation = data.population;
  const countryLanguages = Object.values(data.languages).join(', ');

  let cardMarkup = `<h2><img src="${countryFlag}" alt="${countryFlagAlt}" width="50" height="30"> <b>${countryName}</b></h2>`;
  cardMarkup += `<p><b>Capital:</b> <span>${countryCapital}</span></p>`;
  cardMarkup += `<p><b>Population:</b> <span>${countryPopulation}</span></p>`;
  cardMarkup += `<p><b>Languages:</b> <span>${countryLanguages}</span></p>`;


  countryInfoLnk.insertAdjacentHTML('afterbegin', cardMarkup);

}
function renderCountriesTable(data) {
  countryListLnk.innerHTML = '';
  const listMarkup = data
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${flags.alt}" width="25" height="15"><span>${name.common}</span>`;
    })
    .join('');

  countryListLnk.insertAdjacentHTML('afterbegin', listMarkup);
}


