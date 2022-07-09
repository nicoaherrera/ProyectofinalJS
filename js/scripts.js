


const tbody = document.querySelector('.tbody')
let carrito = []


const $ = (selector) => document.querySelector(selector);
const domElements = {
  productsContainer: $("#cards-container"),
};


//Render de productos en HTML!!!
const renderProducts = (products = []) => {
  //Primero reviso si mi parámetro es un array. Si no lo es, lanzo un error.
  //Aunque por default le puse que me parámetro sea un array, puede ser que no sea un array y me de el error.
  if (!Array.isArray(products)) {
    console.error("El parametro products debe ser un array");
    return;
  }

  //Si es un array, genial, voy a verificar que no este vacio y sino lanzo un error.
  //Esto es una forma de validar que el array no este vacio y solo lo verifico si ya previamente valide que fuera un array.
  if (products.length === 0) {
    console.error("No hay productos para mostrar");
    return;
  }

  //Si es un array y no esta vacio, voy a recorrer el array y voy a crear una tarjeta para cada producto.
  products.forEach((product) => {
    const result = createBootstrapCard(product);
    domElements.productsContainer.appendChild(result);
    
  });
  return;
};


//cardButtonContainer.classList.add("btn", "btn-primary", "button", "text-center");



// contenido de cards

const createBootstrapCard = (content = {}) => {
  // Reviso si el content no tiene propiedades y lanzo un error si es asi.
  if (Object.keys(content).length === 0) {
    console.error("No se puede crear una tarjeta sin contenido");
    return;
  }



  const {title, img, description, price, codBarras} = content;

  // Crear el elemento, el contenedor general del card
  const cardContainer = getCardContainter();
  cardContainer.setAttribute("codBarras", codBarras);
  // Creo el wrapper especifico para la card.
  const card = getCard();
  //Agrego el wrapper al contenedor del card
  cardContainer.appendChild(card);
  //Creo la imagen del producto
  const cardImg = getCardImg(img, title);
  card.appendChild(cardImg);

  //Creo el body, que esta misma funciona se encarga de llamar a las funciones que completan el body
  const cardBody = getCardBody(title, img, description, price);
  card.appendChild(cardBody);
  
  const cardButton = getCardButton();
  card.appendChild(cardButton);

  return cardContainer;
};

const getCardContainter = () => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("col", "d-flex", "justify-content-center", "mb-4");

  return cardContainer;
};

const getCard = () => {
  const card = document.createElement("div");
  card.classList.add("card", "shadow", "mb-1", "bg-dark", "rounded");
  card.style.width= "20rem";

  return card;
};

//Me devuelve un elemento image con sus atributos.
const getCardImg = (imageUrl = "", imageAlt = "Nothing") => {
  //Si la imagen no tiene URL no quiero que haga nada. Lanzo un error por consola y retorno un elemento vacio.
  if (imageUrl === "") {
    console.error("No se puede crear una tarjeta sin imagen");
    return;
  }

  //Si no tiene alt, dejo que la funcion siga pero lanzo un warning.
  if (imageAlt === "Nothing") {
    console.warn(
      "Atención, una tarjeta sin atributo alt personalizado no es una buena práctica."
    );
  }

  const image = document.createElement("img");
  image.setAttribute("src", imageUrl);
  image.setAttribute("alt", imageAlt);
  return image;
};

// Creo funcion que me devuelve el body. Desde aca voy a llamar a todas las funciones que me vallan armando el body entero.
const getCardBody = (title, img, description, price) => {
  if (!title) {
    console.error("No se puede crear una tarjeta sin titulo");
    return;
  }

  if (!price) {
    console.error("No se puede crear una tarjeta sin precio");
    return;
  }

  if (!description) {
    console.error("No se puede crear una tarjeta sin descripción");
    return;
  }
  /*if (!codBarras) {
    console.error("No se puede crear una tarjeta codigo de barras");
    return;
  }*/


  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = getCardTitle(title);
  cardBody.appendChild(cardTitle);

  const cardPrice = getCardPrice(price);
  cardBody.appendChild(cardPrice);

  const cardDescription = getCardDescription(description);
  cardBody.appendChild(cardDescription);



  return cardBody;
};

const getCardTitle = (title) => {
  if (!title) {
    console.error("No se puede crear un titulo sin un título.");
    return;
  }

  const cardTitleContainer = document.createElement("div");
  cardTitleContainer.classList.add("card", "shadow", "mb-1", "bg-dark", "rounded");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "pt-2", "text-center", "text-white");
  cardTitle.textContent = title;
  cardTitleContainer.appendChild(cardTitle);

  return cardTitleContainer;
};

const getCardPrice = (price) => {
  //Si no me llega ningun precio (puede ser undefined por ejemplo) lanzo error.
  if (!price) {
    console.error("No se puede crear un contenedor sin precio");
  }

  //Si me llega un precio, pero el número es negativo lanzo error.
  if (price < 0) {
    console.error("No se puede crear un precio negativo");
  }

  const cardPrice = document.createElement("h5");
  cardPrice.classList.add("text-white");
  // Si el precio es 0 ASUMO que es gratuito el producto.
  if (price === 0) {
    cardPrice.appendChild(document.createTextNode(`FREE`));
  }

  cardPrice.appendChild(document.createTextNode(`Precio: $${price}`));

  return cardPrice;
};

const getCardDescription = (description) => {
  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-text", "text-white-50", "description");
  cardDescription.appendChild(document.createTextNode(description));

  return cardDescription;
};

const getCardButton = () => {
  

  //Creo el div del boton.
  const cardButton = document.createElement("div");
  cardButton.classList.add(
    "d-grid", "gap-2"
  );

  // Creo el elemento contenedor del boton.
  const cardButtonContainer = document.createElement("button");
  cardButtonContainer.classList.add("btn", "btn-primary", "button", "text-center");
  cardButtonContainer.textContent = "Agregar a carrito";
  cardButton.appendChild(cardButtonContainer);


  return cardButton;
};

const Clickbutton = document.querySelectorAll('.button');

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
  btn.addEventListener('click', () => {
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #006400, #90EE90)",
      }
      }).showToast();})
});

function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let subTotal = 0;
  
  const itemCartSubTotal = document.querySelector('.itemCartSubTotal')
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    subTotal = subTotal + precio*item.cantidad
  })
  let totalIva = parseInt(subTotal*1.21);

  itemCartSubTotal.innerHTML = `Subtotal $${subTotal}`
  itemCartTotal.innerHTML = `Total iva incluido $${totalIva}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  tr.addEventListener('click', () => {
  Toastify({
    text: "Producto removido exitosamente",
    duration: 2500,
    style: {
      background: "linear-gradient(to right, #ff0000, #ff8000)",
    }
    }).showToast(); })


  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
};

const btnFin = document.querySelector('#btnfin');

btnFin.addEventListener("click", () => {
  Swal.fire({
  title: 'Quiere finalizar su compra?',
  
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Confirmar!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Muchas gracias!',
      'Pronto recibira su pedido',
      'success'
    )
  }
})});



(() => {
  fetch ('/json/data.json')
    .then((response) => response.json())
    .then(data => {
      renderProducts(data);
      console.log(data);
    })
    .catch((err) => console.error(err));
})();