import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

export const connectToDB = async () => {
  const connection = {};

  try {
    // Check if already connected
    if (connection.isConnected) {
      console.log('Already connected to the database');
      return;
    }

    // Connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI);

    // Update connection status
    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected');
  } catch (error) {
    // Handle connection errors
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
  }
};

export const generateUsers = async (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      img: faker.image.avatar(),
      isAdmin: faker.datatype.boolean(),
      isActive: faker.datatype.boolean(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    });
  }

  return users;
};

export const generatProducrs = async (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      title: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.number.int({min:0, max: 100}),
      img: faker.image.avatar(),
      color: faker.color.human(),
      size: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
    });
  }

  return products;
};

export const formatDate = (originalDate) => {
  const day = originalDate.getUTCDate();
  const month = originalDate.getUTCMonth() + 1; // Months are zero-based
  const year = originalDate.getUTCFullYear();

  const formattedDate = `${day < 10 ? '0' : ''}${day}-${
    month < 10 ? '0' : ''
  }${month}-${year}`;

  return formattedDate;
};
