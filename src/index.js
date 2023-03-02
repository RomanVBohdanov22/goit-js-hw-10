import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputLnk = document.querySelector('input#search-box');
const countryUlistLnk = document.querySelector('.country-list');
const countryInfoLnk = document.querySelector('.country-info');

inputLnk.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  e.preventDefault();
  e.target.value = String(e.target.value).trim();
  let countryName = String(e.target.value);
  if (countryName.length) {
    console.log(countryName);

    fetchCountries(countryName)
      // --> to render
      .then(data => {
        // Data handling
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        renderCoutries(data);
        ///console.log(data);
      })
      .catch(error => {
        Notify.warning(error);
        console.log(error);
        // Error handling
      }); // <--  to render;
  }
}

function renderCoutries(data) {
  if (data.length <= 1) {
    const countryName = data[0].name.official;
    const countryCapital = data[0].capital[0];
      const countryFlag = data[0].flags.svg;
      const countryPopulation = data[0].population;
    console.log(countryName);
    console.log(countryCapital);
      console.log(countryFlag);
      console.log(countryPopulation);
  }
  console.log(data);
}

//debounce()
//Notify.info("hello world!");
/*

https://restcountries.com/#filter-response

Name

Search by country name. It can be the native name or partial name

https://restcountries.com/v2/name/{name}

https://restcountries.com/v2/name/peru

https://restcountries.com/v2/name/united
*/

/*
 function renderCountrisName(arrayCountriesName) {
    const markup = arrayCountriesName.map(({name, flags}) => {
        return `<li><img src="${flags.svg}" alt="${flags.alt}" width="25" height="15"><span>${name.common}</span></li>`;
    }).join("");
    countriesList.innerHTML = markup;
}
*/
