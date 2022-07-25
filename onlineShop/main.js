//Products Page

let url = "https://magazinonline-d9935-default-rtdb.europe-west1.firebasedatabase.app/";
let id = window.location.search.substr(4);
let listaProduse = [];
let produs = {};
let cartStr = localStorage.getItem("cart");
let cart = JSON.parse(cartStr);
	


async function getListaProduse() {
    document.querySelector("#loading").classList.remove("hidden");
    let response = await fetch (url+".json");
    listaProduse = await response.json();
    document.querySelector("#loading").classList.add("hidden");
    drawProduse();
    countCart();
}

function drawProduse(){
    let str = "";
    let produsCautat = document.querySelector('[name="search"]').value;
    for (let [i,produs] of Object.entries(listaProduse)){
        if(produs===null){
            continue;
        }
        if(!produs.nume.includes(produsCautat) && !produs.nume.toLowerCase().includes(produsCautat) && !produs.nume.toUpperCase().includes(produsCautat)){
            continue;
        }
        str+=`
            <div class="product">
                <div class="img-container">
                <a href="details.html?id=${i}">
                    <img src="${produs.poza}" class="product-img" alt="${produs.nume}"/>
                    <div class="viewBtn"><button id="btnView">View</button></div>
                    <h3>${produs.nume}</h3>
                </a>
                    <h4>${produs.pret}.00 €</h4>
                </div>
            </div>   
        `
    }
    document.querySelector(".products-container").innerHTML = str;
}


//Details Page

async function getProdus() {
    document.querySelector("#loading").classList.remove("hidden");
    let response = await fetch (url+id+".json");
    produs = await response.json();
    document.querySelector("#loading").classList.add("hidden");
    drawDetalii();
    countCart();
}

function drawDetalii(){

	document.querySelector("#poza").src = produs.poza;
    document.querySelector("#nume").innerText = produs.nume;
    document.querySelector("#pret").innerHTML = `<strong>Price:</strong> <span>${produs.pret}.00 €</span>`;
    document.querySelector("#cantitate").innerHTML = `<strong>In stock: ${produs.cantitate}</strong>`;
    document.querySelector("#descriere").innerHTML = `
    <dt><strong>Product Description:</strong></dt>
    <dd>${produs.descriere}</dd>
    `
}


function addToCart() {
    let poza = produs.poza;
    let nume = produs.nume;
    let quantity = document.querySelector("#articleQuantity").value;
    quantity = Number(quantity);
    let pret = produs.pret;
    let stoc = produs.cantitate;
    let cartStr = localStorage.getItem("cart");
    let cart = [];
	if(cartStr !== null){
		cart = JSON.parse(cartStr);
	}
    let found = false;
    for (let item of cart) {
        if (item.id === id) {
            found = true;
            if(item.quantity + quantity > stoc){
                alert("THE QUANTITY REQUESTED EXCEEDS THE AVAILABLE STOCK!");
            } else {
                item.quantity += quantity;
                showToast();
                stoc -= quantity;
            }
            break;
        }
    }
    
    if (!found && quantity > stoc) {
        alert("THE QUANTITY REQUESTED EXCEEDS THE AVAILABLE STOCK!");
    }
    if (!found &&  quantity <= stoc) {
            cart.push({ 
            id: id, 
            quantity: quantity,
            nume: nume,
            pret: pret,
            poza: poza,
        });
        stoc -= quantity;
        showToast();
    } 
    localStorage.setItem("cart", JSON.stringify(cart));
    countCart();
}

function countCart() {
    let cartStr = localStorage.getItem("cart");
    let cart = [];
	if(cartStr !== null){
		cart = JSON.parse(cartStr);
	}
    let counter = 0;
    for (let i=0; i<cart.length; i++){
        counter += cart[i].quantity;
    }
    document.querySelector(".cart-items").innerHTML = counter;
}


function showToast(){
    let toast = document.getElementById("toast");
    toast.classList.add("show");
    toast.innerHTML = (`The product "${produs.nume}" was added to your cart!`);
    setTimeout(function(){
        toast.classList.remove("show");
    },3000);
}


// Cart Page

function drawCart() {
    document.querySelector("#loading").classList.remove("hidden");
    let str = "";
    for (let i=0; i<cart.length; i++){
        str += `
        <div class="cart-item">
            <form>
                <div class="cart-product">
                <a href="details.html?id=${cart[i].id}">
                    <div class="cart-image" style="background-image: url(${cart[i].poza})"></div>
                    <div class="cart-product-info">
                        <p class="cart-product-name">${cart[i].nume}</p>
                </a>
                        <p class="cart-price-sm">${cart[i].pret}.00 €</p>
                    </div>
                </div>
                <div class="cart-quantity-md">
                    <div class="cart-quantity-controls">
                        <button onclick="decrease('${cart[i].id}');">-</button>
                        <input type="text" class="qty" value="${cart[i].quantity}"/>
                        <button onclick="increase('${cart[i].id}');">+</button>
                    </div>
                </div>
                <div class="cart-unit-price">
                    <h4>${cart[i].pret}.00 €</h4>
                </div>
                <div class="cart-product-subtotal">
                    <h4>${cart[i].pret * cart[i].quantity}.00 €</h4>
                </div>
                <div class="cart-remove">
                    <input id="stergeBtn" onclick="sterge('${i}');" class="btn" type="button" value="Remove"/>
                </div>
                <div class="cart-controls-sm">
                    <button class="remove" onclick="sterge('${i}');"><i class="fas fa-trash-alt"></i> Remove </button>
                    <div class="cart-quantity-controls-sm">
                        <button onclick="decrease('${cart[i].id}');">-</button>
                        <input type="text" class="qty" value="${cart[i].quantity}"/>
                        <button onclick="increase('${cart[i].id}');">+</button>
                    </div>
                </div>
            </form>
        </div>
        `
    }
    document.querySelector(".cart-item").innerHTML = str;
    totalCart();
    countCart();
    document.querySelector("#loading").classList.add("hidden");
}


function decrease(id) {
    for (let i=0; i<cart.length; i++){
        if (cart[i].id === id && cart[i].quantity > 1 ) {
            cart[i].quantity -= 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}

function increase(id) {
    for (let i=0; i<cart.length; i++){
        if (cart[i].id === id){
            cart[i].quantity += 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}

function sterge(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}

function totalCart() {
    let total = 0;
    for (let i=0; i<cart.length; i++){ 
        let itemQuantity = cart[i].quantity;
        let itemPret = cart[i].pret;
        total += itemQuantity * itemPret;
        document.querySelector("#total").innerHTML = `Total: ${total}.00 €`;
    }
}

function buy(){
    Swal.fire({
        type: "success",
        text: "Order Completed"
    });
    setTimeout(function(){
        window.location = "index.html";
    },3500);
}

function goBack() {
    window.history.back();
}

let toTop = document.querySelector(".to-top");
window.addEventListener("scroll", ()=>{
    if(window.pageYOffset >100){
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})







