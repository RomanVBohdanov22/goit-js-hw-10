const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = "?fields=name,capital,population,languages,flags";

export function fetchCountries(name) {
  const searchUrl = BASE_URL + name + FIELDS;

  const respo = fetch(searchUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);//
        }       
      return response.json();
    })

  return respo; 
}