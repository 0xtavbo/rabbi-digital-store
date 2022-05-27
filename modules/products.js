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
    <div class="product-card">
      <div class="img-wrapper">
        <img class="${gender} ${category}" src="${url}" alt="${gender}-${category}">
      </div>
    
      <div class="product-data">
        <p class="product-description">${description} //. Precio $${price}</p>
        <div class="size-wrapper">
          <p>Talle único: Large</p>
        </div>
        <div class="cart-btn btn-wrapper">
          <button value="${id}" class="mdc-button mdc-button--unelevated add-cart-btn btn"">Agregar al carrito</button>
        </div>
        <div class="wishlist-btn btn-wrapper">
          <button value="${id}" class="mdc-button mdc-button--unelevated add-wishlist-btn btn">Agregar a favoritos</button>
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
    loadCardEvents();
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

function loadCardEvents() {
  const cartButtons = document.querySelectorAll(".add-cart-btn");
  const wishlistButtons = document.querySelectorAll(".add-wishlist-btn");

  cartButtons.forEach((cartBtn) => {
      cartBtn.addEventListener("click", addProductToCart);
  });

  wishlistButtons.forEach((wishlistBtn) => {
    wishlistBtn.addEventListener("click", addProductToWishlist);
  });
};

function getListItems(list) {
  return JSON.parse(localStorage.getItem(list)) || [];
};

function isProductInList(list, productId) {
  var array = getListItems(list);
  return array.some(item => item.id === productId.id);
};

function addProductToWishlist(event) {
  var productId = { id: event.target.value };
  var list = [];

  if(!isProductInList('wishlist', productId)) {
    list = getListItems('wishlist');
    list.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(list));
  }
};

function addProductToCart(event) {
  const id = event.target.value;
  console.log('id', id);
  console.log(isProductInList('cart', id));
  if(!isProductInList('cart', id)) {
    localStorage.setItem('cart', id)
  }
};

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