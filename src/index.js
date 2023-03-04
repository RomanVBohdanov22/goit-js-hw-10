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
  countryListLnk.innerHTML = '';
  countryInfoLnk.innerHTML = '';
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
        //Notify.failure(error);
        Notify.failure(`${error} ( Oops, there is no country with that name )`);
        //alert(`${error} Oops, there is no country with that name`);
        console.log(error);
        // Error handling
      }); // <--  to render;
  }
}

function renderCoutries(data) {
  if (data.length <= 1) {
    renderOneCountry(data);
  } else renderCountriesTable(data);
  //console.log(data);
}

function renderOneCountry(data) {
  const countryName = data[0].name.official;
  const countryCapital = data[0].capital[0];
  const countryFlag = data[0].flags.svg;
  const countryPopulation = data[0].population;
  //const countryLanguages = data[0].map(( languages ) => { return `${languages}`; }).join(", ");
  //Добрый вечер, <p><b>Languages:</b>${Object.values(languages).join(", ")}</p>
  console.log(countryName);
  console.log(countryCapital);
  console.log(countryFlag);
  console.log(countryPopulation);
  const countryLanguages = Object.values(data[0].languages).join(', ');
  console.log(countryLanguages);

  console.log(data);
}
function renderCountriesTable(data) {
  countryListLnk.innerHTML = '';
  const listMarkup = data
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${flags.alt}" width="25" height="15"><span>${name.common}</span>`;
    })
    .join('');
  //countryListLnk.innerHTML = listMarkup;
  countryListLnk.insertAdjacentHTML('afterbegin', listMarkup);
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
