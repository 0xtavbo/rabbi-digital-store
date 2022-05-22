import categoriesTypes from "../assets/data/categoriesTypes.js";
import productsData from "../assets/data/productsData.js"
import {
  renderCategories,
  loadFilterEvents
} from "./filters.js";

const productsContainer = document.getElementById("products-container");

let products = [];
let filteredProducts = [];
let productCategories = [];
let selectedFilters = [];

const productCard = ({id, gender, category, description, price, url}) => {
  return `
    <div id="${id}" class="product-card">
      <div class="img-wrapper">
        <img class="${gender} ${category}" src="${url}" alt="${gender}-${category}">
      </div>
    
      <div class="product-data">
        <p class="product-description">${description} //. Precio $${price}</p>
        <div class="size-wrapper">
          <p>Talle único: Large</p>
        </div>
        <div class="buttons-wrapper">
          <button class="btn-add-cart __btn">+</button>
          <button class="btn-add-cart __btn">-</button>
        </div>
        <div class="wishlist-btn">
          <button class="wishlist-btn">Agregar a favoritos</button>
        </div>
      </div>
    </div>
  `;
};

function renderProducts(products) {
  productsContainer.innerHTML = '';
  if (products.length == 0) {
    productsContainer.innerHTML = `
    <p id='no-selection'>
      No ha seleccionado ninguna categoria
    </p>
    `;
  } else {
    products.map((product) => {
      const {id, gender, category, description, price, url} = product
      productsContainer.innerHTML += productCard({id, gender, category, description, price, url})
    });
  };
};

function filterProducts(products) {
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  selectedFilters = [];
  for (var i = 0; i < checkboxes.length; i++) {
    selectedFilters.push(checkboxes[i].value);
  }
  filteredProducts = products.filter(filterProductByCategory);
  return filteredProducts;
}

function filterProductByCategory(product) {
  return selectedFilters.includes(product.category);
}

function _renderFilteredProducts(products) {
  filteredProducts = filterProducts(products);
  renderProducts(filteredProducts);
}

function renderFilteredProducts() {
  _renderFilteredProducts(products);
}

function initData() {
  products = productsData;
  productCategories = categoriesTypes;
  renderProducts(productsData);
  renderCategories(productCategories);
  const filterOptions = document.querySelectorAll(".filter-option");
  loadFilterEvents(filterOptions);
}

initData();

export { renderFilteredProducts };