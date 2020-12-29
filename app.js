// Just used to group data together
class Product {

  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `Total: £${1}`;
  }

  render() {
    const cartEl = document.createElement('section')
    cartEl.innerHTML = `
      <h2>Total: £${0}</h2>
      <button>Order</button>
    `;
    cartEl.classList.add('checkout');
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}
// Not really used to group data together, but more to do with holding the logic to render a product item.
class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    // Calling the static method can be called directly on the class.
    App.addProductToCart(this.product);
  }

  // Not a reserved keyword, you can call it what you like.
  render() {
    const prodEl = document.createElement('li');
    prodEl.classList.add('product-item');

    prodEl.innerHTML = `
      <div class="product-item">
        <img src="${this.product.imageURL}" alt="${this.product.title}">
        <div class"product-item__content">
          <h2>${this.product.title}</h2>
          <h3>£${this.product.price}</h3>
          <button>Add to cart</button>
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
      `NULIAJUK // Abstract Whale Tail Acrylic Painting in Blue and Turquoise`,
      `https://i.etsystatic.com/24718322/r/il/3e7f63/2672457185/il_794xN.2672457185_ozhg.jpg`,
      `'NULIAJUK' | An original acrylic painting on paper 42cmx29.7cm The painting will be wrapped securely to ensure it will arrive uncreased and safely for you to enjoy in it's new home. Please note that the frame is not included`,
      55.00
    ),
    new Product(
      `CARIBBEAN SEA // Original Abstract Acrylic Wave Painting in light blue`,
      `https://i.etsystatic.com/24718322/r/il/0990fe/2672518377/il_794xN.2672518377_ot04.jpg`,
      `CARIBBEAN SEA' | An original acrylic painting on paper 42cmx29.7cm The painting will be wrapped securely to ensure it will arrive uncreased and safely for you to enjoy in it's new home. Please note that the frame is not included.`,
      50.00
    ),
    new Product(
      `North Sea // Blue Abstract Wave, Original Acryl Painting on Paper`,
      `https://i.etsystatic.com/24718322/r/il/91408e/2503773204/il_794xN.2503773204_cf6q.jpg`,
      `'NORTH SEA' | An original acrylic painting on paper 29,5cmx39cm The painting will be wrapped securely to ensure it will arrive uncreased and safely for you to enjoy in it's new home. Please note that the frame is not included.`,
      25.00
    )
  ];

  render() {
    const prodList = document.createElement('ul');
    prodList.classList.add('product-list');

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
    const renderHook = document.getElementById('e-comm-app');
    
    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

// By using the static methods, it means you can call the method from within any object that is an instance of that initial class. - And the method is unchanged in each instantiated object and can be passed around and used when needed as a kinda global function. Useful to share data between classes.
class App {
  // This isn't needed but makes it clearer that we expect to have the static property explicitly. Can be initialised if needed, but here it's not.
  static cart;

  static init() {
    const shop = new Shop()
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

// This starts and calls everything
App.init();