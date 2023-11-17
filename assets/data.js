const productsData = [
  {
    id: 1,
    nombre: "Volver Al Futuro",
    precio: 1800,
    categoria: "ciencia-ficcion",
    poster: "./assets/img/Productos/Volver al Futuro - Inshus Posters.jpg",
  },
  {
    id: 2,
    nombre: "Batman: The Dark Knight",
    precio: 1500,
    categoria: "superheroes",
    poster:
      "./assets/img/Productos/Batman The Dark Knight - Inshus Posters.jpg",
  },
  {
    id: 3,
    nombre: "Batman v Superman",
    precio: 1500,
    categoria: "superheroes",
    poster: "./assets/img/Productos/Batman v Superman - Inshus Posters.jpg",
  },
  {
    id: 4,
    nombre: "Better Call Saul",
    precio: 1500,
    categoria: "series",
    poster: "./assets/img/Productos/Better Call Saul - Inshus Posters.jpg",
  },
  {
    id: 5,
    nombre: "Breaking Bad ",
    precio: 1500,
    categoria: "series",
    poster: "./assets/img/Productos/Breaking Bad - Inshus Posters.jpg",
  },
  {
    id: 6,
    nombre: "Chucky",
    precio: 1500,
    categoria: "terror",
    poster: "./assets/img/Productos/Chucky - Inshus Posters.jpg",
  },
  {
    id: 7,
    nombre: "Cobra Kai",
    precio: 1500,
    categoria: "series",
    poster: "./assets/img/Productos/Cobra Kai - Inshus Posters.jpg",
  },
  {
    id: 8,
    nombre: "Interestelar",
    precio: 1500,
    categoria: "ciencia-ficcion",
    poster: "./assets/img/Productos/Interestelar - Inshus Posters.jpg",
  },
  {
    id: 9,
    nombre: "Avengers",
    precio: 1500,
    categoria: "superheroes",
    poster: "./assets/img/Productos/Avengers - Inshus Posters.jpg",
  },
  {
    id: 10,
    nombre: "Batman",
    precio: 1500,
    categoria: "superheroes",
    poster: "./assets/img/Productos/Batman - Inshus Posters.jpg",
  },
  {
    id: 11,
    nombre: "Iron Man",
    precio: 1500,
    categoria: "superheroes",
    poster: "./assets/img/Productos/Iron Man - Inshus Posters.jpg",
  },
  {
    id: 12,
    nombre: "John Wick",
    precio: 1500,
    categoria: "accion",
    poster: "./assets/img/Productos/John Wick - Inshus Posters.jpg",
  },
  {
    id: 13,
    nombre: "Joker",
    precio: 1500,
    categoria: "drama",
    poster: "./assets/img/Productos/Joker - Inshus Posters.jpg",
  },
  {
    id: 14,
    nombre: "Jurassic Park",
    precio: 1500,
    categoria: "ciencia-ficcion",
    poster: "./assets/img/Productos/Jurassic Park - Inshus Posters.jpg",
  },
  {
    id: 15,
    nombre: "La Casa De Papel",
    precio: 1500,
    categoria: "series",
    poster: "./assets/img/Productos/La Casa De Papel - Inshus Posters.jpg",
  },
  {
    id: 16,
    nombre: "La La Land",
    precio: 1500,
    categoria: "romantica",
    poster: "./assets/img/Productos/La La Land - Inshus Posters.jpg",
  },
  {
    id: 17,
    nombre: "Rocky",
    precio: 1500,
    categoria: "drama",
    poster: "./assets/img/Productos/Rocky - Inshus Posters.jpg",
  },
  {
    id: 18,
    nombre: "Scream",
    precio: 1500,
    categoria: "terror",
    poster: "./assets/img/Productos/Scream - Inshus Posters.jpg",
  },
  {
    id: 19,
    nombre: "Titanic",
    precio: 1500,
    categoria: "romantica",
    poster: "./assets/img/Productos/Titanic - Inshus Posters.jpg",
  },
];

const separarProductos = (size) => {
  const productsList = [];
  for (let i = 0; i < productsData.length; i += size)
    productsList.push(productsData.slice(i, i + size));
  console.log(productsList);
  return productsList;
};

const appState = {
  products: separarProductos(3),
  currentProductsIndex: 0,
  productsLimit: separarProductos(3).length,
  activeFilter: null,
};
