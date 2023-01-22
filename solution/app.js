const products = [];

function Product(name, imgSrc, price, amount, discount) {
  this.name = name;
  this.imgSrc = imgSrc;
  this.price = price;
  this._amount = amount;
  this.total = this._amount * this.price;
  this.discount = discount;
 
  Object.defineProperty(this, "amount", {
    get: function () {
      return this._amount;
    },
    set: function (value) {
      this._amount = value;
      this.total = this._amount * this.price;
    },
  });
}

// added new products
products.push(new Product("Antique Clock", "../img/photo3.jpg", 74.99, 0, 12));
products.push(new Product("Levi Shoes", "../img/photo2.png", 45.99, 0, 18));
products.push(new Product("Vintage Bag", "../img/photo1.png", 34.99, 0, 18));

const getProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
const cartContainer = document.querySelector('.cart');


window.addEventListener('load', () => {
  products.forEach(product => createProducts(product))
  
});

cartContainer.addEventListener('click', (e) => {
  console.log(e.target);
});

const createProducts = (product) => {

  const {name, imgSrc, price, amount, total, discount} = product;
  
  const createProduct = document.createElement('div');
  createProduct.setAttribute('class','container product p-3 border rounded-3 my-2');
  
  const createRow = document.createElement('div');
  createRow.classList.add('row');

  const createColImg = document.createElement('div');
  createColImg.setAttribute('class', 'col-sm-7');

  const createImg = document.createElement('img');
  createImg.setAttribute('class', 'img-fluid rounded-4');
  createImg.setAttribute('src', `${imgSrc}`);

  const createColProductInfo = document.createElement('div');
  createColProductInfo.classList.add('col-sm-5');

  const createProductName = document.createElement('p');
  createProductName.setAttribute('class', 'my-1 fs-5');
  createProductName.innerText = `${name}`;

  const createDiscountPrice = document.createElement('span');
  createDiscountPrice.setAttribute('class','fs-5 mx-1');
  createDiscountPrice.innerText = `$${(price - (price *(discount/100))).toFixed(2)}`
  
  const createPrice =  document.createElement('span');
  createPrice.setAttribute('class', 'text-decoration-line-through');
  createPrice.innerText = `$${price}`


  const createIcons = document.createElement('div');
  createIcons.setAttribute('class', 'border d-flex justify-content-around align-items-center py-1 rounded-2 my-2');

  const createIconMinus = document.createElement('i');
  createIconMinus.setAttribute('class','fa-solid fa-minus');
  
  const createAmount = document.createElement('span');
  createAmount.innerText = amount;

  const createIconPlus = document.createElement('i');
  createIconPlus.setAttribute('class', 'fa-solid fa-plus');
  

  const createRemoveButton = document.createElement('input');
  createRemoveButton.setAttribute('type', 'button');
  createRemoveButton.setAttribute('class', 'mt-1');
  createRemoveButton.setAttribute('value', 'Remove');
  
  const createProductTotal = document.createElement('p');
  createProductTotal.classList.add('mt-1');
  createProductTotal.innerText = `Product Total: $${total}`

  //append
  cartContainer.prepend(createProduct);
  createProduct.appendChild(createRow);
  createRow.appendChild(createColImg);
  createColImg.appendChild(createImg);
  createRow.appendChild(createColProductInfo);
  createColProductInfo.appendChild(createProductName);
  createColProductInfo.appendChild(createDiscountPrice);
  createColProductInfo.appendChild(createPrice);
  createColProductInfo.appendChild(createIcons);
  createIcons.appendChild(createIconMinus);
  createIcons.appendChild(createAmount);
  createIcons.appendChild(createIconPlus);
  createColProductInfo.appendChild(createRemoveButton);
  createColProductInfo.appendChild(createProductTotal);
}
