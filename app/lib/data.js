import { Product, User } from './models';
import { connectToDB } from './utils';
import mongoose from 'mongoose'

export const fetchUser = async (q, page) => {
  const regex = new RegExp(q, 'i');

  const item_per_page = 20;

  try {
    await connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const usersData = await User.find({ username: { $regex: regex } })
      .limit(item_per_page)
      .skip(item_per_page * (page - 1));
    return {count, usersData};
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch users!');
  } finally {
    await mongoose.disconnect()
  }
};

export const fetchProduct = async (q, page) => {
  const regex = new RegExp(q, 'i');

  const item_per_page = 20;

  try {
    await connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const productsData = await Product.find({ title: { $regex: regex } })
      .limit(item_per_page)
      .skip(item_per_page * (page - 1));
    return {count, productsData};
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch users!');
  } finally {
    await mongoose.disconnect()
  }
};

export const addData = async (data, model) => {
  try {
    await connectToDB();
    await model.insertMany(data);
    console.log('Data added to database');
  } catch (error) {
    console.log(error.message);
    throw new Error('Failed to fetch users!');
  }
};

// DUMMY DATA
export const cards = [
  {
    id: 1,
    title: 'Total Users',
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: 'Stock',
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: 'Revenue',
    number: 6.642,
    change: 18,
  },
];
