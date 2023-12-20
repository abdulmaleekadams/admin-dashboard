'use server';
import { Product, User } from './models';
import bcrypt from 'bcrypt';
import { connectToDB } from './utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const addUser = async (formData) => {
  console.log(formData);
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    await connectToDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    const createdUser = await newUser.save();
    console.log(createdUser);
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log(id);
  try {
    await connectToDB();
    await User.findByIdAndDelete({ _id: id });
    console.log('user deleted');
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/users');
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log(id);
  try {
    await connectToDB();
    await Product.findByIdAndDelete({ _id: id });
    console.log('Product deleted');
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/products');
};

export const addProduct = async (formData) => {
  console.log(formData);
  const { title, cat, price, stock, color, size, desc } =
    Object.fromEntries(formData);

  try {
    await connectToDB();

    const newProduct = new Product({
      title,
      cat,
      price,
      stock,
      color,
      size,
      desc,
    });

    const createdProduct = await newProduct.save();
    console.log(createdProduct);
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export const updateUser = async (formData) => {
  const { id, username, email, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    await connectToDB();

    const updatedFields = {
      username,
      email,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updatedFields).forEach(
      (key) =>
        (updatedFields[key] === '' || undefined) && delete updatedFields[key]
    );

    await User.findByIdAndUpdate(id, updatedFields);
    console.log('User updated');
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const updateProduct = async (formData) => {
   const { id, title, desc, price, stock, color, size } =
     Object.fromEntries(formData);

  try {
    await connectToDB();

    const updatedFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updatedFields).forEach(
      (key) =>
        (updatedFields[key] === '' || undefined) && delete updatedFields[key]
    );

    await Product.findByIdAndUpdate(id, updatedFields);
    console.log('User updated');
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};
