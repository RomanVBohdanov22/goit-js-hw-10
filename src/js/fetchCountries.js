//fetchCountries(name)

export function fetchCountries(name) { 
    const firstUrl = "https://restcountries.com/v3.1/name/";
    const searchUrl = firstUrl + String(name);
    /*
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    */
    return "country inside"; // not true...
}