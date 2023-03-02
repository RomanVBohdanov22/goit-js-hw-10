//fetchCountries(name)
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const KEYS = "?fields=name,capital,population,languages,flags";
//"?fields=name.official,capital,population,languages,flags.svg"; //name.official 
/*
https://restcountries.com/v2/{service}?fields={field},{field},{field}
https://restcountries.com/v2/all?fields=name,capital,currencies
*/

export function fetchCountries(name) {
  const searchUrl = BASE_URL + String(name) + KEYS;
  console.log(`${searchUrl}`);
  const respo = fetch(searchUrl)
    .then(response => {
        if (!response.ok) {
          //response.status===
        throw new Error(response.status + " Oops, there is no country with that name" );
        }       
      return response.json();
    })

  return respo; // not true...
}

/*
https://restcountries.com/v2/{service}?fields={field},{field},{field}

https://restcountries.com/v2/all?fields=name,capital,currencies
*/
