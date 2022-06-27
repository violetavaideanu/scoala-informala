let inregistrari = [];
let indexEditare = -1;

function draw(){
    let str = "";
    let str1 = "";
    for(let i=0; i<inregistrari.length; i++){
        if(inregistrari[i].action === "marked"){
        str+=`
            <tr>
                <td class="markedItem" style="text-decoration: line-through; text-decoration-color: darkorange; text-decoration-thickness: 3px";>-${inregistrari[i].itemDescription}</td>
                <td><button id="markBtn" onclick="markAsBuyed(${i});">Mark as buyed</button></td>
            </tr>
        `
    } else {
        str+=`
            <tr>
                <td class="unmarked">-${inregistrari[i].itemDescription}</td>
                <td><button id="markBtn" onclick="markAsBuyed(${i});">Mark as buyed</button></td>
            </tr>
        `
    }
    document.querySelector("#tabel tbody").innerHTML=str + str1;
    }  
}

function cancel(){
    indexEditare = -1;			
    document.querySelector("form").reset();
}

function addItem(){
    let itemDescription = document.querySelector("[name='itemDescription']").value;
    inregistrari.push({
        "itemDescription": itemDescription
    });
    draw();
    cancel();
}

function markAsBuyed (idx){
    for (let i=0; i < inregistrari.length; i++){
        if (i === idx){
            inregistrari[i].action = "marked";
        }
    }
    draw();
}

function compara(a,b){
    if (a.itemDescription.toLowerCase() < b.itemDescription.toLowerCase()
    )return -1;
    if (a.itemDescription.toLowerCase() > b.itemDescription.toLowerCase()
    )return 1;
    return 0;
}

function sortAsc(){
    inregistrari.sort(compara);
    draw();
}

function sortDesc(){
    inregistrari.sort(compara);
    inregistrari.reverse();
    draw();
}
