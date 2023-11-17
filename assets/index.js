const containerProductos = document.querySelector(".container-productos");
const botonVerMas = document.querySelector(".ver-mas");
const containerCategorias = document.querySelector(".categorias");
const categorias = document.querySelectorAll(".categoria");
const botonMenu = document.querySelector(".menu-label");
const botonCarrito = document.querySelector(".cart-label");
const menu = document.querySelector(".navbar");
const carrito = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("CARRITO ==> ", cart);

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

renderCart = () => {};

const init = () => {
  renderProductos(appState.products[appState.currentProductsIndex]);
  botonVerMas.addEventListener("click", verMasProductos);
  containerCategorias.addEventListener("click", aplicarFiltro);
  botonMenu.addEventListener("click", toggleMenu);
  menu.addEventListener("click", cerrarMenu);
  botonCarrito.addEventListener("click", toggleCarrito);
  overlay.addEventListener("click", cerrarTodo);
  window.addEventListener("scroll", cerrarTodo);
  window.addEventListener("DOMContentLoader", renderCart);
};

init();
