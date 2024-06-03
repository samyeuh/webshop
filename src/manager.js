import axios from 'axios';

class Product {
  constructor(id = "", name = "", desc = "", price = 0) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
  }
}

class Stock {
  constructor() {
    this.list_product = [];
  }

  async init() {
    const response = await axios.get('http://localhost:27017/products');
    this.list_product = response.data.map(p => new Product(p._id, p.name, p.desc, p.price));
  }

  get_list_product() {
    return this.list_product;
  }

  get_prod_by_id(id) {
    return this.list_product.find(product => product.id == id) || null;
  }
}

class Cart {
  constructor() {
    this.list_cart = {};
  }

  get_list_cart() {
    return this.list_cart;
  }

  addInCart(id) {
    if (this.list_cart[id]) {
      this.list_cart[id]++;
    } else {
      this.list_cart[id] = 1;
    }
  }

  removeFromCart(id) {
    if (this.list_cart[id]) {
      if (this.list_cart[id] > 1) {
        this.list_cart[id]--;
      } else {
        delete this.list_cart[id];
      }
    }
  }

  get_nbr_product() {
    return Object.values(this.list_cart).reduce((a, b) => a + b, 0);
  }

  get_total_price(stk) {
    return Object.entries(this.list_cart).reduce((total, [id, qty]) => {
      const product = stk.get_prod_by_id(id);
      return total + (product.price * qty);
    }, 0);
  }
}

export { Product, Stock, Cart };
