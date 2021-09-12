//UI Variables
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const box = document.querySelector('#box');

let cities_data = [];

//Initial data load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

//Filter using form submit
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     filterCities(search.value);
//     search.value = '';
// });

//Filter using onChange event on seach input
search.addEventListener('keyup', (e) => {
    e.preventDefault();
    filterCities(e.target.value);
})


const loadData = async () => {
    try {
        const res = await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
        const data = await res.json();
        console.log(data);
        cities_data = data;
        displayCities(cities_data);
    } catch (err) {
        const output = `<div class="card"><h5>Error : ${err.message}</h5></div>`
    }
}

//Filter through cities
const filterCities = (text) => {
    const filteredCities = cities_data.filter((city) => {
        const regex = new RegExp(`${text}`, 'gi');
        return city.city.match(regex) || city.state.match(regex);
    });
    displayCities(filteredCities);
}

//Display cities
const displayCities = (cities) => {

    let output = '';

    if (cities.length > 0) {
        //Add card for each city
        cities.forEach((city) => {
            output = output + `<div class="card">
        <h5 id="city">City : ${city.city}</h5>
        <h6 id="growth_from_2000_to_2013">Growth : ${city.growth_from_2000_to_2013}</h6>
        <h6 id="latitude">Latitude : ${city.latitude}</h6>
        <h6 id="longitude">Longitude : ${city.longitude}</h6>
        <h6 id="population">Population : ${city.population}</h6>
        <h6 id="rank">Rank : ${city.rank}</h6>
        <h6 id="state">State : ${city.state}</h6>
    </div>`
        });

    } else {
        //Display Error
        output = `<div class="card">
            <h5>Error : No Citites / States Found.</h5>
        </div>`

    }

    //Add output to card-box
    box.innerHTML = output;

}

