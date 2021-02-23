let month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
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
    document.querySelector(".presiune").innerText = `Presiune: ${info.main.pressure} hPa`;
    document.querySelector(".temp").innerText = `Temperatura curenta: ${Math.floor(info.main.temp)}°C`;
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
    document.querySelector(".prognoza").classList.remove("hidden");
    
    function genereazaPrognoza() {

        let currentDate = new Date();
        let generatedZiua1 = "";
        let generatedZiua2 = "";
        let generatedZiua3 = "";
        let generatedZiua4 = "";
        let generatedZiua5 = "";
        let generatedZiua6 = "";
        let generatedHead = "";
        let dayArray = [];

        for (let i = 0; i < info.list.length; i++) {
            let icon = `${urlIcon}${info.list[i].weather[0].icon}.png`;
            let date = new Date(Number(`${info.list[i].dt}000`));
            let fullDate = `${date.getFullYear()}-${month[date.getMonth()]}-${date.getDate()}`;

            if (!dayArray.includes(fullDate)) {
                dayArray.push(fullDate);
            }
            dayArray.push(
                {   
                    "day": date.getDate(),
                    "icon": icon,
                    "cond": info.list[i].weather[0].description,
                    "hour": `${info.list[i].dt_txt.substr(11, 5)}`,
                    "temp": Math.floor(info.list[i].main.temp)
                }
            );
        }

        for (let i = 0; i < dayArray.length; i++) {

            if (typeof(dayArray[i]) === "string") {
                generatedHead += `
                    <th>${dayArray[i]}</th>
                `;
            }
            if (dayArray[i].day === currentDate.getDate()) {
                generatedZiua1 += `
                    <li><img src="${dayArray[i].icon}"></li>
                    <li><strong style="text-transform: capitalize";>${dayArray[i].cond}</strong></li>
                    <li>Ora: ${dayArray[i].hour}</li>
                    <li>Temp: ${dayArray[i].temp}°C</li>
                    `;
            } else if (dayArray[i].day === currentDate.getDate()+1) {
                generatedZiua2 += `
                    <li><img src="${dayArray[i].icon}"></li>
                    <li><strong style="text-transform: capitalize";>${dayArray[i].cond}</strong></li>
                    <li>Ora: ${dayArray[i].hour}</li>
                    <li>Temp: ${dayArray[i].temp}°C</li>
                    `;
            } else if (dayArray[i].day === currentDate.getDate()+2) {
                generatedZiua3 += `
                    <li><img src="${dayArray[i].icon}"></li>
                    <li><strong style="text-transform: capitalize";>${dayArray[i].cond}</strong></li>
                    <li>Ora: ${dayArray[i].hour}</li>
                    <li>Temp: ${dayArray[i].temp}°C</li>
                    `;
            } else if (dayArray[i].day === currentDate.getDate()+3) {
                generatedZiua4 += `
                    <li><img src="${dayArray[i].icon}"></li>
                    <li><strong style="text-transform: capitalize";>${dayArray[i].cond}</strong></li>
                    <li>Ora: ${dayArray[i].hour}</li>
                    <li>Temp: ${dayArray[i].temp}°C</li>
                    `;
            } else if (dayArray[i].day === currentDate.getDate()+4) {
                generatedZiua5 += `
                    <li><img src="${dayArray[i].icon}"></li>
                    <li><strong style="text-transform: capitalize";>${dayArray[i].cond}</strong></li>
                    <li>Ora: ${dayArray[i].hour}</li>
                    <li>Temp: ${dayArray[i].temp}°C</li>
                    `;
            } else if (dayArray[i].day === currentDate.getDate()+5) {
                generatedZiua6 += `
                    <li><img src="${dayArray[i].icon}"></li>
                    <li><strong style="text-transform: capitalize";>${dayArray[i].cond}</strong></li>
                    <li>Ora: ${dayArray[i].hour}</li>
                    <li>Temp: ${dayArray[i].temp}°C</li>
                    `;
            }
        }

        document.querySelector('.tabel-prognoza thead').innerHTML = generatedHead;

        document.querySelector('.ziua1').innerHTML = generatedZiua1;
        document.querySelector('.ziua2').innerHTML = generatedZiua2;
        document.querySelector('.ziua3').innerHTML = generatedZiua3;
        document.querySelector('.ziua4').innerHTML = generatedZiua4;
        document.querySelector('.ziua5').innerHTML = generatedZiua5;
        document.querySelector('.ziua6').innerHTML = generatedZiua6;
    }
}

function hidePrognoza() {
    document.querySelector(".prognoza").classList.add("hidden");
}

            


    
