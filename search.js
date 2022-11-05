// http://localhost:3000/items

const searchInput = document.querySelector("#search");
const productsDOM =document.querySelector(".products-center");
const btns =document.querySelectorAll(".btn");

let allProductsdata =[];

const filters ={
    searchItems:"",
};

document.addEventListener("DOMContentLoaded",() =>{
   axios
   .get("http://localhost:3000/items")
   .then((res) => {
    console.log(res.data);
    allProductsdata =res.data;

    renderProducts(res.data,filters);
   })
   .catch((err) =>console.log(err));
});







function renderProducts(products,_filters){
    const filteredProducts = products.filter((p) =>{
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML ="";
    console.log(filteredProducts);


   filteredProducts.forEach((item) =>{


    const productsDiv =document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML =` 
     <img class="img-container"
      src=${item.image} alt="p-1">
    </div>
    <div class="product-desc">
        <p class="product-price">${item.price}</p>
        <p class="product-title">${item.title}</p>`;
        productsDOM.appendChild(productsDiv);
   }) ;
};

searchInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    filters.searchItems =e.target.value;
    renderProducts(allProductsdata,filters);
});





btns.forEach((btn) =>{
    btn.addEventListener("click",(e)=>{
        const filter =e.target.dataset.filter;


        console.log(filter);
        filters.searchItems =filter;
        renderProducts(allProductsdata,filters);
    });
});