
let urlVremeaCurenta = "https://api.openweathermap.org/data/2.5/weather?appid=1a0ba4cafe79b1d301ada419624a64c9&units=metric&q=";
let urlPrognoza = "https://api.openweathermap.org/data/2.5/forecast?appid=ae8b983c20a0ecaf1301284afed430e6&units=metric&q=";
let urlIcon = "http://openweathermap.org/img/w/";
let urlHarta = {
    front: "https://maps.google.com/maps?",
    end: "&t=&z=13&ie=UTF8&iwloc=&output=embed"
}

async function afiseazaVremea(){

    let selectedCity = document.querySelector("#oras").value;
    let response = await fetch (urlVremeaCurenta + selectedCity);
    let info = await response.json();
    
    document.querySelector(".icon").src = urlIcon + info.weather[0].icon + ".png";
    document.querySelector(".descriere").innerText = `Description: ${info.weather[0].description}`;
    document.querySelector(".umiditate").innerText = `Humidity: ${info.main.humidity}%`;
    document.querySelector(".presiune").innerText = `Pressure: ${info.main.pressure}`;
    document.querySelector(".temp").innerText = `Current temperature: ${Math.floor(info.main.temp)}°C`;
    document.querySelector(".min").innerText = `Minimum of the day: ${Math.floor(info.main.temp_min)}°C`;
    document.querySelector(".max").innerText = `Maximum of the day: ${Math.floor(info.main.temp_max)}°C`;
    document.querySelector("#mapUrl").src = `${urlHarta.front}q=${selectedCity}${urlHarta.end}`;
}
async function afiseazaPrognoza() {

    let selectedCity = document.querySelector("#oras").value;
    let response = await fetch (urlPrognoza + selectedCity);
    let info = await response.json();
    genereazaPrognoza();
    document.querySelector("#oras").value = "";
    document.querySelector(".lista-prognoza").classList.remove("hidden");
    
    function genereazaPrognoza() {

        let lista = info.list
        let dataCurenta = lista[0].dt_txt.substr(0, 10);
        let ziua = document.querySelectorAll(".ziua");
        let indexZi = 0;
        ziua[indexZi].innerHTML = `<p class="data"><strong>Date: ${dataCurenta}</strong></p>`;

        for (let i = 0; i < lista.length; i++) {
            let icon = `${urlIcon}${lista[i].weather[0].icon}.png`;
            let dataLista = lista[i].dt_txt.substr(0, 10);

            if (dataLista === dataCurenta) {
                ziua[indexZi].innerHTML += `
                   <li><img src="${icon}"></li>
                   <li><strong style="text-transform: capitalize";>${lista[i].weather[0].description}</strong></li>
                   <li>Hour: ${lista[i].dt_txt.substr(11, 5)}</li>
                   <li>Temp: ${Math.floor(lista[i].main.temp)}°C</li>` 
            }
            else {
                indexZi += 1;
                dataCurenta = dataLista;
                ziua[indexZi].innerHTML = `<p class="data"><strong>Date: <span>${dataCurenta}</strong></p>`
                i--;
            }
        }
    }
}       
   
function hidePrognoza() {
    document.querySelector(".lista-prognoza").classList.add("hidden");
}