'use server';
import { User } from './models';
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
