const containerProductos = document.querySelector(".container-productos");
const botonVerMas = document.querySelector(".ver-mas");
const containerCategorias = document.querySelector(".categorias");
const categorias = document.querySelectorAll(".categoria");
const botonMenu = document.querySelector(".menu-label");
const botonCarrito = document.querySelector(".cart-label");
const menu = document.querySelector(".navbar");
const carrito = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const contenedorCarrito = document.querySelector(".cart-container");
const labelTotal = document.querySelector(".total");
const vaciar = document.querySelector(".vaciar");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("CARRITO ==> ", cart);

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Cargar Productos

const crearProductosTemplate = (productos) => {
  const { id, nombre, precio, poster } = productos;
  return `
    <div class="productos-cards">
              <img
                class="img-cards"
                src="${poster}"
                alt="${nombre}"
              />
              <h3>${nombre}</h3>
              <p>$${precio}</p>
              <botton
              data-id="${precio}"
              data-name="${nombre}"
              data-precio="${precio}"
              data-poster="${poster}" class="boton producto-boton" href="#contact">COMPRAR</botton>
    </div>
    `;
};

const renderProductos = (productsLista) => {
  containerProductos.innerHTML += productsLista
    .map((product) => crearProductosTemplate(product))
    .join("");
};

const verMasProductos = () => {
  appState.currentProductsIndex += 1;

  const { products, currentProductsIndex, productsLimit } = appState;
  renderProductos(products[currentProductsIndex]);
  if (currentProductsIndex === productsLimit - 1) {
    botonVerMas.classList.add("ocultar");
  }
};

const noEsBoton = (element) => {
  return (
    element.classList.contains("categoria") &&
    !element.classList.contains("active")
  );
};

const cambiarBotonActivo = (filter) => {
  const categories = [...categorias];
  categories.forEach((btn) => {
    if (btn.dataset.categoria !== filter) {
      btn.classList.remove("active");
      return;
    }
    btn.classList.add("active");
  });
};

const ocultarBotonVerMas = () => {
  if (!appState.activeFilter) {
    botonVerMas.classList.remove("ocultar");
    return;
  }
  botonVerMas.classList.add("ocultar");
};

const cambiarFiltro = (element) => {
  appState.activeFilter = element.dataset.categoria;
  cambiarBotonActivo(appState.activeFilter);
  ocultarBotonVerMas();
};

const renderPrductosFiltrados = () => {
  const { activeFilter, currentProductsIndex, products } = appState;
  containerProductos.innerHTML = "";
  if (!activeFilter) {
    appState.currentProductsIndex = 0;
    renderProductos(products[currentProductsIndex]);
    return;
  }
  const productosFiltrados = productsData.filter(
    (product) => product.categoria === activeFilter
  );
  renderProductos(productosFiltrados);
};

const aplicarFiltro = (e) => {
  if (!noEsBoton(e.target)) return;
  cambiarFiltro(e.target);
  renderPrductosFiltrados();
};

// Menú

const toggleMenu = () => {
  console.log("Hola");
  menu.classList.toggle("mostrar");
  overlay.classList.toggle("mostrar-overlay");
  if (carrito.classList.contains("abrir-carrito")) {
    carrito.classList.remove("abrir-carrito");
    return;
  }
};

const toggleCarrito = () => {
  console.log("Hola");
  carrito.classList.toggle("abrir-carrito");
  overlay.classList.toggle("mostrar-overlay");
  if (menu.classList.toggle("mostrar")) {
    menu.classList.remove("mostrar");
    return;
  }
};

cerrarTodo = () => {
  menu.classList.remove("mostrar");
  carrito.classList.remove("abrir-carrito");
  overlay.classList.remove("mostrar-overlay");
};

cerrarMenu = (e) => {
  console.log("Hola");
  //if (!e.target.classList.contains("navbar-list")) return;
  menu.classList.remove("mostrar");
  overlay.classList.remove("mostrar-overlay");
};

// Carrito

const crearTemplateProductosCarrito = (e, i) => {
  const { id, name, precio, poster, cuantity } = e;
  return `
  <div class="cart-item">
              <img
                src="${poster}"
                alt="${name}"
              />
              <div class="item-info">
                <h3 class="item-titulo">${name}</h3>
                <span class="item-precio">$${precio}</span>
              </div>
              <div class="item-handler">
                <span class="cantidad-handler down" data-id="${id}">-</span>
                <span class="item-cantidad">${cuantity}</span>
                <span class="cantidad-handler up" data-id="${id}">+</span>
              </div>
  </div>
  `;
};

const renderCart = () => {
  if (!cart.length) {
    contenedorCarrito.innerHTML = `<p class="item-titulo"> No hay productos en el carrito. </p>`;
    return;
  }
  contenedorCarrito.innerHTML = cart
    .map(crearTemplateProductosCarrito)
    .join("");
};

const crearDataProducto = (producto) => {
  const { id, name, precio, poster } = producto;
  return { id, name, precio, poster };
};

const agregarProducto = (e) => {
  if (!e.target.classList.contains("producto-boton")) return;
  const producto = crearDataProducto(e.target.dataset);
  if (existeProducto(producto)) {
    agregarCantidadProducto(productos);
  } else {
    crearProductoCarrito(producto);
  }
  console.log(cart);
  actualizarCarrito();
};

const existeProducto = (producto) => {
  return cart.some((item) => item.id === producto.id);
};

//Esto no funciona
const agregarCantidadProducto = (producto) => {
  cart = cart.map((cartProducto) => {
    return cartProducto.id === producto.id
      ? { ...cartProducto, quantity: cartProducto.quantity + 1 }
      : cartProducto;
  });
};

const crearProductoCarrito = (producto) => {
  cart = [...cart, { ...producto, quantity: 1 }];
};

const mostarTotal = () => {
  const total = cart.reduce((acc, cur) => acc + Number(cur.precio), 0);
  labelTotal.textContent = `$${total}`;
};

const borrarCarrito = () => {
  if (window.confirm("Estás seguro que queres vaciar el carrito?")) {
    borrarItemsCarrito();
    alert("tu carrito está vacío");
  }
};

const borrarItemsCarrito = () => {
  cart = [];
  actualizarCarrito();
};

const actualizarCarrito = () => {
  saveCart();
  renderCart();
  mostarTotal();
};

const init = () => {
  renderProductos(appState.products[appState.currentProductsIndex]);
  botonVerMas.addEventListener("click", verMasProductos);
  containerCategorias.addEventListener("click", aplicarFiltro);
  botonMenu.addEventListener("click", toggleMenu);
  menu.addEventListener("click", cerrarMenu);
  botonCarrito.addEventListener("click", toggleCarrito);
  overlay.addEventListener("click", cerrarTodo);
  window.addEventListener("scroll", cerrarTodo);
  window.addEventListener("DOMContentLoaded", renderCart);
  containerProductos.addEventListener("click", agregarProducto);
  window.addEventListener("DOMContentLoaded", mostarTotal);
  vaciar.addEventListener("click", borrarCarrito);
};

init();
