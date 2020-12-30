// Just used to group data together
class Product {

  constructor(title, imageURL, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
  }

}

class ShoppingCart {
  items = [];

  totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `£${this.totalAmount().toFixed(2)}`;
  }

  render() {
    const cartEl = document.createElement('div');
    cartEl.innerHTML = `
      <p>£${0}</p>
    `;
    cartEl.classList.add('basket');
    this.totalOutput = cartEl.querySelector('p');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    // Calling the static method can be called directly on the class.
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageURL}" alt="${this.product.title}" >
          <div>
            <h2>${this.product.title}</h2>
            <h3>£${this.product.price}</h3>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    // because this queryselector runs on each code snippet on each class, it'll be specific to each button
    const addToCartButton = prodEl.querySelector('button');
    // Need to bind 'this' because as we learned, this on an eventlistener belongs to the global window object as that's what called it.
    addToCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      `NULIAJUK // Abstract Whale Tail Acrylic Painting`,
      `https://i.etsystatic.com/24718322/r/il/3e7f63/2672457185/il_794xN.2672457185_ozhg.jpg`,
      55.00
    ),
    new Product(
      `CARIBBEAN SEA // Original Abstract Acrylic Wave Painting`,
      `https://i.etsystatic.com/24718322/r/il/0990fe/2672518377/il_794xN.2672518377_ot04.jpg`,
      50.00
    ),
    new Product(
      `North Sea // Original Acryl Painting on Paper`,
      `https://i.etsystatic.com/24718322/r/il/91408e/2503773204/il_794xN.2503773204_cf6q.jpg`,
      25.00
    ),
    new Product(
      `KEVIN // Original Abstract Acrylic Painting`,
      `https://i.etsystatic.com/24718322/r/il/3c3fa2/2672500425/il_794xN.2672500425_32k9.jpg`,
      30.00
    ),
    new Product(
      `FOREST JUMP // Abstract Acrylic Forest Painting`,
      `https://i.etsystatic.com/24718322/r/il/921eef/2624828636/il_794xN.2624828636_q38u.jpg`,
      25.00
    ),
    new Product(
      `Playa Pesquero // Acrylic Tropical Beach Painting`,
      `https://i.etsystatic.com/24718322/r/il/ed5378/2566710788/il_794xN.2566710788_j6ba.jpg`,
      235.00
    )
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

// This brings the logic of both sections (the product list and checkout section together)
class Shop {
  render() {
    const renderHook = document.getElementById('app');
    const shoppingBasketDiv = document.querySelector('div.shopping-basket');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    shoppingBasketDiv.prepend(cartEl);
    renderHook.append(prodListEl);
  }
}

// By using the static methods, it means you can call the method from within any object that is an instance of that initial class. - And the method is unchanged in each instantiated object and can be passed around and used when needed as a kinda global function. Useful to share data between classes.
// This starts and calls everything
class App {
  // This isn't needed but makes it clearer that we expect to have the static property explicitly. Can be initialised if needed, but here it's not.
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

