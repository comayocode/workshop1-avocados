//Url API
const urlBase = "https://platzi-avo.vercel.app";

const containerNode = document.querySelector('#container');

//Dar formato de dólar USD ($) a los precios
const formatPrice = (price) => {
  const newPrice = window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  return newPrice;
}

//Conecta al servidor
window.fetch(`${urlBase}/api/avo`)
  //Procesa la respuesta y la convierte en JSON
  .then((respuesta) => respuesta.json())
  //La data se renderiza
  .then(info => {

    const todosLosElementos = []; //Array que almacena los contenedores con los elementos

    info.data.forEach(item => {
      //----- RENDERIZAR PROPIEDADES -----
      const imagen = document.createElement('img'); //Crear la imagen
      imagen.src = `${urlBase}${item.image}`;
      imagen.classList.add("product-img");

      const producto = document.createElement('h2'); //Crear el nombre
      producto.textContent = item.name; //Insertar el precio de la API al elemento
      producto.classList.add("product");

      const desc = document.createElement("p");
      desc.textContent = item.attributes.description;
      desc.classList.add("product-desc")

      const precio = document.createElement('div'); //Crear el precio
      precio.textContent = formatPrice(item.price); //Insertar el precio de la API al elemento pasándole el formateo
      precio.classList.add("product-price");

      const containerInfo = document.createElement('div')
      containerInfo.append(producto, desc, precio);
      containerInfo.classList.add("container-info");

      const containerData = document.createElement('div'); //Crear contenedor de los elementos
      containerData.append(imagen, containerInfo); //Insertar los elementos al contenedor
      containerData.classList.add("container-data");

      //document.body.appendChild(containerData);
      todosLosElementos.push(containerData);
    });

    containerNode.append(...todosLosElementos); //Insertar los contenedores del array en el body
  });
