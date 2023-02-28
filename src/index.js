import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const inputLnk = document.querySelector("#search-box");
const countryUlistLnk = document.querySelector(".country-list");
const countryInfoLnk = document.querySelector(".country-info");
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