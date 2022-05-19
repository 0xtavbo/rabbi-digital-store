import productsData from "../assets/data/productsData.js"

const productsContainer = document.getElementById("products-container");

const productCard = ({id, gender, category, description, price, url}) => {
  return `
    <div id="${id}" class="product-card">
      <div class="img-wrapper">
        <img class="${gender} ${category}" src="${url}" alt="${gender}-${category}">
      </div>
    
      <div class="product-data">
        <p class="product-description">${description} //. Precio $${price}</p>
        <div class="size-wrapper">
          <p>Talle único Large</p>
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

function loadProducts(productsData) {
  productsData.map((product) => {
    const {id, gender, category, description, price, url} = product
    productsContainer.innerHTML += productCard({id, gender, category, description, price, url})
  })
}

loadProducts(productsData);