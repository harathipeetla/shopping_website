const productsList = document.getElementById('products-list-container')

const categoryButtons = document.querySelectorAll('.button-btn')
const menButton = document.getElementById('men-category')
const womenButton = document.getElementById('women-category')
const KidsButton = document.getElementById('kids-category')


const fetchData = async (category)=>{
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        const data = await response.json()
        displayProducts(data.categories.find(cat => cat.category_name === category).category_products)
    }catch (error){
            console.log('error fetching data: ', error )
    }
}

const displayProducts = (products)=>{

    productsList.innerHTML = ''

    products.forEach(product => {
        const productContainer = document.createElement('div')

        const discountPercentage = ((product.compare_at_price - product.price)/ product.compare_at_price) * 100

        productContainer.classList.add('product-card')
        productContainer.innerHTML =`
        <div class="img-container">
        <img src = "${product.image}" alt = "${product.title}"/>
        ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
        </div>
        <div class="title-container">
        <h3>${ product.title.slice(1, 10)}.... </h3>
        <li>${product.vendor}</li>
        </div>
        <div class="price-details">
        <div><p class="price">Rs ${product.price}</p></div>
        <div><p class= "compare-at-price">${product.compare_at_price}</p></div>
         <p class="discount">${discountPercentage.toFixed(0)}%</p>
        </div>
        <button class="cart-btn">Add To Cart</button>
        `
        productsList.appendChild(productContainer)
        
    });

}


const setActiveButtons = (activeButton)=>{
    categoryButtons.forEach(button =>{
        button.classList.remove('active')
    })
    activeButton.classList.add('active')

}

menButton.addEventListener('click', ()=>{
    fetchData('Men')
    setActiveButtons(menButton)
})


womenButton.addEventListener('click', ()=>{
    fetchData('Women')
    setActiveButtons(womenButton)
})

KidsButton.addEventListener('click', ()=>{
    fetchData('Kids')
    setActiveButtons(KidsButton)
})


fetchData('Men')