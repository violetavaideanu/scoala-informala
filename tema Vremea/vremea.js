
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
    document.querySelector(".descriere").innerText = `Descriere: ${info.weather[0].description}`;
    document.querySelector(".umiditate").innerText = `Umiditate: ${info.main.humidity}%`;
    document.querySelector(".presiune").innerText = `Presiune: ${info.main.pressure}`;
    document.querySelector(".temp").innerText = `Temperatura curentă: ${Math.floor(info.main.temp)}°C`;
    document.querySelector(".min").innerText = `Minima zilei: ${Math.floor(info.main.temp_min)}°C`;
    document.querySelector(".max").innerText = `Maxima zilei: ${Math.floor(info.main.temp_max)}°C`;
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

        let dataCurenta = info.list[0].dt_txt.substr(0, 10);
        let ziua = document.querySelectorAll(".ziua");
        let indexZi = 0;
        ziua[indexZi].innerHTML = `<p class="data"><strong>Data: ${dataCurenta}</strong></p>`;

        for (let i = 0; i < info.list.length; i++) {
            let icon = `${urlIcon}${info.list[i].weather[0].icon}.png`;
            let dataLista = info.list[i].dt_txt.substr(0, 10);

            if (dataLista === dataCurenta) {
                ziua[indexZi].innerHTML += `
                   <li><img src="${icon}"></li>
                   <li><strong style="text-transform: capitalize";>${info.list[i].weather[0].description}</strong></li>
                   <li>Ora: ${info.list[i].dt_txt.substr(11, 5)}</li>
                   <li>Temp: ${Math.floor(info.list[i].main.temp)}°C</li>` 
            }
            else {
                indexZi += 1;
                dataCurenta = dataLista;
                ziua[indexZi].innerHTML = `<p class="data"><strong>Data: <span>${dataCurenta}</strong></p>`
                i--;
            }
        }
    }
}       
   
function hidePrognoza() {
    document.querySelector(".lista-prognoza").classList.add("hidden");
}