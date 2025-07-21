import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from '@/modules/customers/entities/customer.entity';
import { Category } from '@/modules/categories/entities/category.entity';
import { Product } from '@/modules/products/entities/product.entity';
import { Order } from '@/modules/orders/entities/order.entity';
import { OrderItem } from '@/modules/orders/entities/order-item.entity';
import { Admin } from '@/modules/admins/entities/admin.entity';

// Database configuration
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ebot_api',
  entities: [Admin, Customer, Category, Product, Order, OrderItem],
  synchronize: true, // Only for development
});

async function ensureDatabaseExists() {
  const adminDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres' // Connect to default database
  });

  try {
    await adminDataSource.initialize();
    await adminDataSource.query(`CREATE DATABASE "${process.env.DB_NAME || 'ebot_api'}"`);
    console.log('Database created or already exists');
  } catch (err) {
    console.log('Database likely already exists');
  } finally {
    await adminDataSource.destroy();
  }
}

async function seedDatabase() {
  try {
    await ensureDatabaseExists();
    await dataSource.initialize();
    console.log('Data Source initialized');

    await clearDatabase();
    await seedAdmins();
    await seedCustomers();
    await seedCategories();
    await seedProducts();
    await seedOrders();

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await dataSource.destroy();
  }
}

async function clearDatabase() {
  // Clear tables in reverse order of dependency
  const tables = [
    'order_items',
    'orders',
    'products',
    'categories',
    'customers',
    'admins'
  ];

  for (const table of tables) {
    await dataSource.query(`DELETE FROM ${table} CASCADE;`);
    console.log(`Cleared table: ${table}`);
  }
}

async function seedAdmins() {
  const repository = dataSource.getRepository(Admin);
  const admins = [
    {
      phone: '+959123456789',
      password: await bcrypt.hash('owner@123', 10),
      telegram_id: '@store_owner',
      name: 'Main Owner',
      is_owner: true,
    },
    {
      phone: '+959987654321',
      password: await bcrypt.hash('manager@123', 10),
      telegram_id: '@store_manager',
      name: 'Inventory Manager',
      is_owner: false,
    },
    {
      telegram_id: '@support_staff',
      name: 'Customer Support',
      is_owner: false,
    },
    {
      telegram_id: '@delivery_admin',
      name: 'Delivery Manager',
      is_owner: false,
    },
    {
      telegram_id: '@marketing_admin',
      name: 'Marketing Specialist',
      is_owner: false,
    },
  ].map(data => repository.create(data));

  await repository.save(admins);
  console.log('Admins seeded!');
}

async function seedCustomers() {
  const repository = dataSource.getRepository(Customer);
  const customers = [
    {
      phone: '+959111111111',
      name: 'John Smith',
      address: '123 Main St, Yangon',
      customer_type: 'VIP',
    },
    {
      phone: '+959222222222',
      name: 'Alice Johnson',
      address: '456 Market St, Mandalay',
      customer_type: 'VIP',
    },
    {
      phone: '+959333333333',
      name: 'Bob Williams',
      address: '789 River Rd, Naypyidaw',
      customer_type: 'normal',
    },
    {
      phone: '+959444444444',
      name: 'Emma Brown',
      address: '321 Garden Ave, Bago',
      customer_type: 'normal',
    },
    {
      phone: '+959555555555',
      name: 'David Lee',
      address: '654 Mountain View, Taunggyi',
      customer_type: 'normal',
    },
  ].map(data => repository.create(data));

  await repository.save(customers);
  console.log('Customers seeded!');
}

async function seedCategories() {
  const repository = dataSource.getRepository(Category);
  const categories = [
    { name: 'Electronics', description: 'Electronic devices and accessories' },
    { name: 'Clothing', description: 'Fashion and apparel for all ages' },
    { name: 'Home & Kitchen', description: 'Home appliances and utensils' },
    { name: 'Beauty', description: 'Cosmetics and personal care products' },
    { name: 'Groceries', description: 'Daily essential food items' },
  ].map(data => repository.create(data));

  await repository.save(categories);
  console.log('Categories seeded!');
}

async function seedProducts() {
  const repository = dataSource.getRepository(Product);
  const categoryRepository = dataSource.getRepository(Category);
  const categories = await categoryRepository.find();

  const products = [
    // Electronics
    {
      name: 'Smartphone X',
      description: 'Latest smartphone with 128GB storage',
      price: 999.99,
      stock: 50,
      images: ['phone1.jpg', 'phone2.jpg'],
      category: categories[0],
    },
    {
      name: 'Wireless Earbuds',
      description: 'Noise cancelling wireless earbuds',
      price: 149.99,
      stock: 100,
      images: ['earbuds.jpg'],
      category: categories[0],
    },
    {
      name: 'Smart Watch',
      description: 'Fitness tracking and notifications',
      price: 199.99,
      stock: 30,
      images: ['watch.jpg'],
      category: categories[0],
    },
    {
      name: 'Tablet',
      description: '10-inch display with 64GB storage',
      price: 299.99,
      stock: 25,
      images: ['tablet.jpg'],
      category: categories[0],
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof speaker',
      price: 79.99,
      stock: 60,
      images: ['speaker.jpg'],
      category: categories[0],
    },
    // Clothing
    {
      name: 'Men\'s T-Shirt',
      description: '100% cotton, slim fit',
      price: 19.99,
      stock: 200,
      images: ['tshirt.jpg'],
      category: categories[1],
    },
  ].map(data => repository.create(data));

  await repository.save(products);
  console.log('Products seeded!');
}

async function seedOrders() {
  const orderRepository = dataSource.getRepository(Order);
  const orderItemRepository = dataSource.getRepository(OrderItem);
  const customerRepository = dataSource.getRepository(Customer);
  const productRepository = dataSource.getRepository(Product);

  const customers = await customerRepository.find();
  const products = await productRepository.find();

  const orders = [
    {
      customer: customers[0],
      status: 'confirmed',
      total: 999.99 + 19.99,
      notes: 'Please deliver after 5pm',
      items: [
        { product: products[0], quantity: 1, price: 999.99 },
        { product: products[5], quantity: 1, price: 19.99 },
      ],
    },
    {
      customer: customers[1],
      status: 'shipped',
      total: 149.99 * 2,
      notes: 'Gift wrapping required',
      items: [
        { product: products[1], quantity: 2, price: 149.99 },
      ],
    },
  ];

  for (const orderData of orders) {
    const order = orderRepository.create({
      customer: orderData.customer,
      status: orderData.status,
      total: orderData.total,
      notes: orderData.notes,
    });

    const savedOrder = await orderRepository.save(order);

    const items = orderData.items.map(item => 
      orderItemRepository.create({
        order: savedOrder,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })
    );

    await orderItemRepository.save(items);
  }
  console.log('Orders seeded!');
}

seedDatabase();