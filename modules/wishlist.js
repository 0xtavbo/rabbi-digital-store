import productsData from "../assets/data/productsData.js"

const wishlistContainer = document.getElementById("wishlist-container");
const products = productsData;
let wishlist = [];

const wishlistCard = ({id, gender, category, description, price, url}) => {
    return `
      <div class="wishlist-card">
        <div class="img-wrapper">
          <img class="wishlist-card ${gender} ${category}" src="${url}" alt="${gender}-${category}">
        </div>
      
        <div class="product-data">
          <p class="product-description">${description} //.</p>
          <p>Precio $${price}</p>
          <div class="size-wrapper">
            <p>Talle único: Large</p>
          </div>
          <div class="remove-btn btn-wrapper">
            <i class="remove-icon remove-btn fa-sm fas fa-trash-alt">Borrar</i>  
          </button>
          </div>
        </div>
      </div>
    `;
};

function renderWishlistItems(wishlist) {
    wishlistContainer.innerHTML = '';
  
    if (wishlist.length == 0) {
        wishlistContainer.innerHTML = `
      <p id='no-selection'>
        Usted no posee productos en su lista de deseados!
      </p>
      `;
      
    } else {
  
        wishlist.map((product) => {
        const {id, gender, category, description, price, url} = product
        wishlistContainer.innerHTML += wishlistCard({id, gender, category, description, price, url})
      });
      loadCardEvents();
    };
  };

  function loadCardEvents() {
    const removeButtons = document.querySelectorAll(".remove-btn");
  
    removeButtons.forEach((removeBtn) => {
        removeBtn.addEventListener("click", removeProduct);
    });
  };

  function filterWishlistItem(product) {
    let list = localStorage.getItem('wishlist');
    return list.includes(product.id);
  }

  function initWishlist() {
      wishlist = products.filter(filterWishlistItem);
      renderWishlistItems(wishlist);
  };

  initWishlist();