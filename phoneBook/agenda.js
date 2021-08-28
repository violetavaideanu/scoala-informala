let inregistrari = [
    {
        "nume": "Andreea",
        "telefon": "0740112233"
    },
    {
        "nume": "Cosmin",
        "telefon": "0722657432"
    },
    {
        "nume": "Ioana Popa",
        "telefon": "0755891148"
    },
    {
        "nume": "Ana",
        "telefon": "0213366852"
    }
];

let indexEditare = -1; 

function draw(){
    let str = "";
    for(let i=0; i<inregistrari.length; i++){
        str+=`
            <tr>
                <td>${inregistrari[i].nume}</td>
                <td>${inregistrari[i].telefon}</td>
                <td><input id="modificaBtn" class="btn" type="button" value="Modifica" onclick="edit(${i});"></td>
                <td><input id="stergeBtn" class="btn" type="button" value="Sterge" onclick="del(${i});" /></td>
            </tr>
        `
    }
    document.querySelector("#tabel tbody").innerHTML=str;
}

function edit(idx){
    let inregistrare = inregistrari[idx];
    document.querySelector("[name='nume']").value=inregistrare.nume;
    document.querySelector("[name='telefon']").value=inregistrare.telefon;
    indexEditare = idx;
    document.querySelector("#editBtn").classList.remove("hidden");
    document.querySelector("#addBtn").classList.add("hidden");
}

function editPasul2(){
    if(indexEditare===-1){
        return;
    }
    let inregistrare = inregistrari[indexEditare];
    inregistrare.nume = document.querySelector("[name='nume']").value;
    inregistrare.telefon = document.querySelector("[name='telefon']").value;
    draw();
    cancel();
}

function cancel(){
    indexEditare = -1;
    document.querySelector("#editBtn").classList.add("hidden");
    document.querySelector("#addBtn").classList.remove("hidden");
    document.querySelector("form").reset();
}

function del(idx){
    if(confirm(`Esti sigur ca vrei sa stergi inregistrarea cu numele ${inregistrari[idx].nume} ?`)){
        inregistrari.splice(idx,1);
        draw();
    }	
}

function adauga(){
    let nume = document.querySelector("[name='nume']").value;
    let telefon = document.querySelector("[name='telefon']").value;
    inregistrari.push({
        "nume": nume,
        "telefon": telefon
    });
    draw();
    cancel();
}
