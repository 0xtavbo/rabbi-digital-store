import { renderFilteredProducts } from "./products.js";

const filtersContainer = document.getElementById("filters-container");

const renderCategoryType = (category) => {
    return `
        <label>
            <input class="mdc-checkbox filter-option" id="filter-${category}" type="checkbox" rel="${category}" value="${category}"/>
            ${category}
        </label>
    `;
};

function renderCategories(categories) {
    categories.map((category) => {
        filtersContainer.innerHTML += renderCategoryType(category);
    });
};

function loadFilterEvents(filterOptions) {
    filterOptions.forEach((filterOption) => {
        filterOption.addEventListener("click", renderFilteredProducts);
    });
};

export {
    renderCategoryType,
    renderCategories,
    loadFilterEvents
};