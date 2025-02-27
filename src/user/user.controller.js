'use strict';

import User from "../models/User.js"; // Ajusta la ruta según tu estructura de archivos
import mongoose from "mongoose";

// Crear usuario
export const createUser = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Creating a new user...");
  try {
    const data = req.body;
    const user = new User(data);
    await user.save();
    console.log("-> User successfully created.");
    return res.send({
      message: "User Controller -> User successfully created.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while creating a user.", error);
    return res.status(500).send({
      message: "User Controller -> An unexpected general error occurred while creating a user.",
      success: false,
      error,
    });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Fetching all users...");
  try {
    const users = await User.find();
    if (users.length === 0) {
      console.log("-> No such users were found for the required call.");
      return res.status(404).send({
        message: "User Controller -> No such users were found for the required call",
        success: false,
      });
    }
    console.log("-> Users found and retrieved successfully.");
    return res.send({
      message: "User Controller -> Users found and retrieved successfully",
      users,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching users.", error);
    return res.status(500).send({
      message: "User Controller -> An unexpected general error occurred while fetching users",
      success: false,
      error,
    });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Fetching user by ID...");
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "User Controller -> Invalid ID format provided",
        success: false,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      console.log("-> User not found with the given ID.");
      return res.status(404).send({
        message: "User Controller -> User not found with the given ID",
        success: false,
      });
    }

    console.log("-> User successfully found.");
    return res.send({
      message: "User Controller -> User successfully found",
      success: true,
      user,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching the user by ID.", error);
    return res.status(500).send({
      message: "User Controller -> An unexpected general error occurred while fetching the user by ID",
      success: false,
      error,
    });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Updating user...");
  try {
    const {id} = req.params;
    const data = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      console.log("-> User not found for update.");
      return res.status(404).send({
        message: "User Controller -> User not found for update.",
        success: false,
      });
    }

    console.log("-> User updated successfully.");
    return res.send({
      message: "User Controller -> User updated successfully.",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the user.", error);
    return res.status(500).send({
      message: "User Controller -> An unexpected general error occurred while updating the user.",
      success: false,
      error,
    });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Deleting user...");
  try {
    const {id} = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("-> User not found for deletion.");
      return res.status(404).send({
        message: "User Controller -> User not found for deletion.",
        success: false,
      });
    }

    console.log("-> User successfully deleted.");
    return res.send({
      message: "User Controller -> User successfully deleted.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while deleting the user.", error);
    return res.status(500).send({
      message: "User Controller -> An unexpected general error occurred while deleting the user.",
      success: false,
      error,
    });
  }
};


// -------------- EXTRA CRUD FUNCTIONS --------------

// Update user role to admin
export const updateRole = async(req, res) => {
  console.log("User Controller: ");
  console.log("-> Updating user's role...");
  try {
    const {id} = req.params;

    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      console.log("-> User not found for update.");
      return res.status(404).send({
        message: "User Controller -> User not found for update.",
        success: false,
      });
    }

    userToUpdate.role = req.role;

    const verify = await User.findByIdAndUpdate(id, userToUpdate, {new: true})

    if (!verify) {
      console.log("-> User cannot be updated.");
      return res.status(404).send({
        message: "User Controller -> User cannot be updated.",
        success: false,
      });
    }

    console.log("-> User updated successfully.");
    return res.send({
      message: `User Controller -> User's role updated successfully to ${userToUpdate.role}.`,
      success: true,
      verify,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the user.", error);
    return res.status(500).send({
      message: "User Controller -> An unexpected general error occurred while updating the user.",
      success: false,
      error,
    });
  }
}

//