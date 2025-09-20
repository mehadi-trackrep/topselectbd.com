import { type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type CartItem, type InsertCartItem } from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByUser(userId: string): Promise<Order[]>;

  // Cart
  addToCart(item: InsertCartItem): Promise<CartItem>;
  getCartItems(sessionId: string): Promise<CartItem[]>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private orders: Map<string, Order> = new Map();
  private cartItems: Map<string, CartItem> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed products
    const productsData: InsertProduct[] = [
      {
        name: "গরুর মাংসের আচার",
        nameEn: "Beef Pickle",
        description: "আমাদের গরুর মাংসের আচারের প্রতিটি চামচে মেখে আছে মমতার ঘ্রাণ, দাদি-নানীর রান্নাঘরের স্মৃতি। এটি শুধু একটি আচার নয়, এটি একটি রাজকীয় অভিজ্ঞতা।",
        descriptionEn: "Every spoonful of our beef pickle carries the fragrance of love and memories from grandmother's kitchen. It's not just a pickle, it's a royal experience.",
        price: 99000, // 990.00 BDT in paisa
        image: "https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "আচার",
        categoryEn: "Pickle",
        stock: 50,
        weight: "৪০০ গ্রাম",
        shelfLife: "৪-৬ মাস",
        ingredients: "গরুর মাংস, সরিষার তেল, লবণ, হলুদ, মরিচ, রসুন, আদা এবং বিশেষ মশলা",
        isActive: true,
      },
      {
        name: "রসুনের আচার",
        nameEn: "Garlic Pickle",
        description: "ছেলেবেলার সেই চেনা ঘ্রাণ আর মা-নানী-দাদির কোলাহলপূর্ণ সেই দুপুরগুলোর কথা মনে করিয়ে দেবে আমাদের রসুনের আচারের স্বাদ।",
        descriptionEn: "The taste of our garlic pickle will remind you of childhood fragrances and those bustling afternoons with mother and grandmother.",
        price: 59000, // 590.00 BDT in paisa
        image: "https://pixabay.com/get/g2870d61b810f073967b924b6077543545fd9c6a762361bde9bf51b8e95a88c6b908a459d9307c5332902966199c80731bc27e17800bf29416a90b9c91f0dca1b_1280.jpg",
        category: "আচার",
        categoryEn: "Pickle",
        stock: 75,
        weight: "৪০০ গ্রাম",
        shelfLife: "৬-৮ মাস",
        ingredients: "রসুন, সরিষার তেল, লবণ, হলুদ, মরিচ গুঁড়া এবং ঐতিহ্যবাহী মশলা",
        isActive: true,
      },
      {
        name: "মিশ্র আচার",
        nameEn: "Mixed Pickle",
        description: "বিভিন্ন সবজি ও মশলার নিখুঁত মিশ্রণে তৈরি এই বিশেষ আচার। প্রতিটি কামড়ে পাবেন ভিন্ন ভিন্ন স্বাদের অনুভূতি।",
        descriptionEn: "A special pickle made with the perfect blend of various vegetables and spices. Experience different flavors in every bite.",
        price: 75000, // 750.00 BDT in paisa
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "আচার",
        categoryEn: "Pickle",
        stock: 30,
        weight: "৪০০ গ্রাম",
        shelfLife: "৪-৬ মাস",
        ingredients: "কাঁচা আম, গাজর, ফুলকপি, মরিচ, রসুন, আদা, সরিষার তেল এবং মিশ্র মশলা",
        isActive: true,
      },
      {
        name: "মরিচের আচার",
        nameEn: "Chili Pickle",
        description: "ঝাল প্রেমীদের জন্য বিশেষভাবে তৈরি এই মরিচের আচার। প্রতিটি চামচে থাকবে আগুনের মতো ঝাল আর অসাধারণ স্বাদ।",
        descriptionEn: "Specially made chili pickle for spice lovers. Every spoonful delivers fiery heat and extraordinary taste.",
        price: 65000, // 650.00 BDT in paisa
        image: "https://pixabay.com/get/gf0bd2ddf424266ef8c621b89ab1ac5e5a88f02c7f30986a0e309a29fc5eb40a509c3fd3ae9dbf58f4eedaa872db092f07fabfaaa92c8355bf8bf37dd436d07a7_1280.jpg",
        category: "আচার",
        categoryEn: "Pickle",
        stock: 40,
        weight: "৪০০ গ্রাম",
        shelfLife: "৬-৮ মাস",
        ingredients: "কাঁচা মরিচ, সরিষার তেল, লবণ, হলুদ, ধনিয়া এবং বিশেষ ঝাল মশলা",
        isActive: true,
      }
    ];

    productsData.forEach((productData) => {
      const product: Product = {
        ...productData,
        id: randomUUID(),
        createdAt: new Date(),
        stock: productData.stock ?? 0,
        isActive: productData.isActive ?? true
      };
      this.products.set(product.id, product);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date(), phone: insertUser.phone ?? null, address: insertUser.address ?? null };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isActive);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const product = this.products.get(id);
    return product?.isActive ? product : undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id, createdAt: new Date(), stock: insertProduct.stock ?? 0, isActive: insertProduct.isActive ?? true };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) =>
        product.isActive && (
          product.name.toLowerCase().includes(lowerQuery) ||
          product.nameEn.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery)
        )
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isActive && (product.category === category || product.categoryEn === category)
    );
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
      userId: insertOrder.userId ?? null,
      status: insertOrder.status ?? 'pending',
      paymentMethod: insertOrder.paymentMethod ?? 'cod'
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  // Cart
  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.productId === insertItem.productId && item.sessionId === insertItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      if (insertItem.quantity !== undefined) {
        existingItem.quantity += insertItem.quantity;
      }
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Create new cart item
      const id = randomUUID();
      const cartItem: CartItem = {
        ...insertItem,
        id,
        createdAt: new Date(),
        quantity: insertItem.quantity ?? 1
      };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
  }
}

export const storage = new MemStorage();
