// Just used to group data together
class Product {

  constructor(title, imageURL, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
  }

}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) { // This is just to check if the data is available to use.
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  //This is just added for readability's sake as the 'this.render' method was added so sub classes could use it. Even if we added code in here, the sub-class' version of this will override it.
  render() {}

  createRootElement(tag, cssClasses, attributes) {

    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.classList.add(cssClasses);
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

// Can only ever extend from 1 class (inheriting from multiple isn't possible in JS)
// What this does is it means all objects that are instatiated from the ShoppingCart class also inherit the fields/properties/methods/behaviour from the base class; Component.
class ShoppingCart extends Component {
  items = [];

  totalAmount() {
    const sum = this.items.reduce((prevValue, currItem) => {
      return prevValue + currItem.price
    }, 0)
    return sum;
  }

  // This is needed so we can initiate the 'Component' class and pass in the 'renderHookId' as an argument.
  // You need to call super() on your parent class (in this case Component) before you start using 'this' keyword in properties in the subclass. 
  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => { // Using an arrow function here as an alternative to binding 'this' as otherwise 'this' will be undefined (because eventlistener)
      console.log('Ordering...')
      console.log(this.items)
    }
    this.render();
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `Total: £${this.totalAmount().toFixed(2)}`;
  }

  render() {
    const cartEl = this.createRootElement('section', 'checkout');
    cartEl.innerHTML = `
      <h2>Total: £${0}</h2>
      <button>Order</button>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}
// Not really used to group data together, but more to do with holding the logic to render a product item.
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    // Calling the static method can be called directly on the class.
    App.addProductToCart(this.product);
  }

  // Not a reserved keyword, you can call it what you like.
  render() {
    const prodEl = this.createRootElement('li', 'product-item');
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
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  // This is just to replicate having to wait for data from an API.
  fetchProducts() {
    this.products = [
      new Product(
        `NULIAJUK // Abstract Whale Tail Acrylic Painting in Blue and Turquoise`,
        `https://i.etsystatic.com/24718322/r/il/3e7f63/2672457185/il_794xN.2672457185_ozhg.jpg`,
        55.00
      ),
      new Product(
        `CARIBBEAN SEA // Original Abstract Acrylic Wave Painting in light blue`,
        `https://i.etsystatic.com/24718322/r/il/0990fe/2672518377/il_794xN.2672518377_ot04.jpg`,
        50.00
      ),
      new Product(
        `North Sea // Blue Abstract Wave, Original Acryl Painting on Paper`,
        `https://i.etsystatic.com/24718322/r/il/91408e/2503773204/il_794xN.2503773204_cf6q.jpg`,
        25.00
      )
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

// This brings the logic of both sections (the product list and checkout section together)
class Shop {
  constructor() {
    this.render();
  }

  render() {    
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

// By using the static methods, it means you can call the method from within any object that is an instance of that initial class. - And the method is unchanged in each instantiated object and can be passed around and used when needed as a kinda global function. Useful to share data between classes.
class App {
  // This isn't needed but makes it clearer that we expect to have the static property explicitly. Can be initialised if needed, but here it's not.
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

// This starts and calls everything
App.init();
