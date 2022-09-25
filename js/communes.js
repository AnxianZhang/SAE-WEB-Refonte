const countriesKey = new Map();
const polygonsKey = new Map();
let countries;
let polygons;

const setCountriesKey = () =>{
    let idx = 0;
    countries.forEach(countrie => {
        countriesKey.set(countrie.textContent, idx);
        polygonsKey.set(polygons[idx], idx); 
        ++idx;
    });
}

const addEvent = () =>{
    countries.forEach(countrie => {
        countrie.addEventListener("mouseover", () => {
          polygons[countriesKey.get(countrie.textContent)].classList.add("change-map-color");
        });
        countrie.addEventListener("mouseleave", () => {
          polygons[countriesKey.get(countrie.textContent)].classList.remove("change-map-color");
        });
    });

    let countrieLinks = Array.from(document.querySelectorAll(".ville-name a"));
    polygons.forEach(polygon => {
        polygon.addEventListener("mouseover", () => {
            countrieLinks[polygonsKey.get(polygon)].style.color = "rgb(194,134,57)";
            countrieLinks[polygonsKey.get(polygon)].style.fontWeight = "bold";
        });
        polygon.addEventListener("mouseleave", () => {
            countrieLinks[polygonsKey.get(polygon)].style.color = "#333";
            countrieLinks[polygonsKey.get(polygon)].style.fontWeight = "normal";
        })
    });
}

const start = () =>{
    setCountriesKey();
    addEvent();
}

const init = () => {
    countries = Array.from(document.querySelectorAll(".ville-name"));
    polygons = Array.from(document.querySelectorAll(".casbt"));

    if (countries == null || polygons == null) {
        alert("null");
    }
    start();
}

window.addEventListener("DOMContentLoaded", init);