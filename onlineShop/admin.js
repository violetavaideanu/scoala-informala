let url = "https://magazinceramica-default-rtdb.europe-west1.firebasedatabase.app/";
let id = window.location.search.substr(4);
let listaProduseAdmin = [];
let produs = {};


// Admin Page

async function getListaProduseAdmin() {
    let response = await fetch (url+".json");
    listaProduseAdmin = await response.json();
    drawProduseAdmin();
}

function drawProduseAdmin(){
    let str = "";
    let produsCautat = document.querySelector('[name="search"]').value;
    for (let [i,produs] of Object.entries(listaProduseAdmin)){
        if(produs===null){
            continue;
        }
        if(!produs.nume.includes(produsCautat) && !produs.nume.toLowerCase().includes(produsCautat) && !produs.nume.toUpperCase().includes(produsCautat)){
            continue;
        }
        str+=`
        <tr>
            <td><img src="${produs.poza}"/></td>
            <td><a href="edit.html?id=${i}">${produs.nume}</a></td>
            <td>${produs.pret}.00 €</td>
            <td>${produs.cantitate}</td>
            <td class="remove-btn"><a href="delete.html?id=${i}">Remove</a></td>
        </tr>  
        `
    }
    document.querySelector(".listaAdmin").innerHTML = str;
}


// Adauga Page

async function salveaza(event){
    event.preventDefault();
    let poza = document.querySelector("[name='poza']").value;
    let nume = document.querySelector("[name='nume']").value;
    let descriere = document.querySelector("[name='descriere']").value;
    let pret = document.querySelector("[name='pret']").value;
    let cantitate = document.querySelector("[name='cantitate']").value;
    
    let produsNou = {
        "nume": nume,
        "poza": poza,
        "descriere": [descriere],
        "pret": pret,
        "cantitate": Number(cantitate)
    };

    let response = await fetch(url+".json", {
        method:"post",
        body: JSON.stringify(produsNou),
        headers: {
          'Content-Type': 'application/json'
        },
    });
    produs = await response.json();
    document.querySelector("form").reset();
}


// Delete Page

async function getProdusDel() {
    let response = await fetch (url+id+".json");
    produs = await response.json();
    drawNume();
}

function drawNume(){
    document.querySelector("#nume").innerText = produs.nume;
}

async function sterge(){
    let response = await fetch(url+id+".json", {
        method:"delete"
    });
    produs = await response.json();
    window.location = "admin.html";  
}


//Edit Page

async function getProdusEdit() {
    let response = await fetch (url+id+".json");
    produs = await response.json();
    drawProdusEdit();
}

function drawProdusEdit(){
	document.querySelector("[name='poza']").value = produs.poza;
    document.querySelector("[name='nume']").value = produs.nume;
    document.querySelector("[name='pret']").value = produs.pret;
    document.querySelector("[name='cantitate']").value = produs.cantitate;
    document.querySelector("[name='descriere']").value = produs.descriere;
}

async function salveazaEdit(event){
    event.preventDefault();
    let poza = document.querySelector("[name='poza']").value;
    let nume = document.querySelector("[name='nume']").value;
    let descriere = document.querySelector("[name='descriere']").value;
    let pret = document.querySelector("[name='pret']").value;
    let cantitate = document.querySelector("[name='cantitate']").value;
    
    let produsNou = {
        "nume": nume,
        "poza": poza,
        "descriere": [descriere],
        "pret": pret,
        "cantitate": Number(cantitate)
    };

    let response = await fetch(url+id+".json", {
        method:"put",
        body: JSON.stringify(produsNou),
        headers: {
          'Content-Type': 'application/json'
        },
    });
    produs = await response.json();

    window.location = "admin.html";
}

let toTop = document.querySelector(".to-top");
window.addEventListener("scroll", ()=>{
    if(window.pageYOffset >100){
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})


