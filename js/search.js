import { fetchProducts } from "./fetch_data.js";
import { productListTmpl } from "./templates.js";

const products = await fetchProducts();
const productListContainer = document.querySelector(".product-container");

export function search() {
  //functionen udskriver vores søgeresultat
  function renderResult(result) {
    productListContainer.innerHTML = "";
    result.forEach((element) => {
      productListContainer.insertAdjacentHTML(
        "beforeend",
        productListTmpl(element)
      );
    });
  }

  //finder de produkter der lever op til søgekriterierne
  function searchInput(e) {
    const category = document.querySelector("#category").value;
    const price = document.querySelector("#priceInput").value;
    const searchTerm = e.target.value.trim().toLowerCase();

    if (category == "all") {
      const result = products.filter((product) =>
        product.title.trim().toLowerCase().includes(searchTerm)
      );
      renderResult(result);
    } else {
      const findCategory = products.filter(
        (product) => product.category === category
      );
      const result = findCategory.filter((product) =>
        product.title.trim().toLowerCase().includes(searchTerm)
      );

      renderResult(result);
    }
  }

  const input = document.querySelector("#search");
  input.addEventListener("input", searchInput);
}
