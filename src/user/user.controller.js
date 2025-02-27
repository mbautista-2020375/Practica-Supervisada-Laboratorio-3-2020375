`use strict`

import User from "./user.model.js"; // Ajusta la ruta según tu estructura de archivos
import mongoose from "mongoose";
import {checkPassword} from "../../utils/encrypt.js"
import {generateJwt} from "../../utils/jwt.js"
import { encrypt } from "../../utils/encrypt.js";


// Crear usuario
export const createUser = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Creating a new user...");
  try {
    const data = req.body;
    data.password = await encrypt(data.password)
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

export const updateUser = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Updating user...");
  try {
    const id = req.user.uid;
    const data = req.body;
    const oldUser = await User.findById(id);
    if (data.name) oldUser.name = data.name;
    if (data.lastname) oldUser.lastname = data.lastname;
    if (data.username) oldUser.username = data.username;
    if (data.email) oldUser.email = data.email;
    if (data.age) oldUser.profileImage = data.age;
    if (data.phone) oldUser.phone = data.phone;
    if (data.password) oldUser.password = encrypt(data.password);
    const updatedUser = await User.findByIdAndUpdate(id, oldUser, { new: true });

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

export const deleteUser = async (req, res) => {
  console.log("User Controller: ");
    console.log("-> Deactivating user...");
    try {
      const {id} = req.user;
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          name: "deleted-user",
          lastname: "deleted-user",
          username: `deleted-${id}`,
          email: `deleted-${id}@deleted.com`,
          status: false,
        },
        { new: true }
      );
  
      if (!updatedUser) {
        console.log("-> User not found for deactivation.");
        return res.status(404).send({
          message: "User Controller -> User not found for deactivation.",
          success: false,
        });
      }
  
      console.log("-> User successfully deactivated.");
      return res.send({
        message: "User Controller -> User successfully deactivated.",
        success: true,
        updatedUser,
      });
    } catch (error) {
      console.error("-> An unexpected general error occurred while deactivating the user.", error);
      return res.status(500).send({
        message: "User Controller -> An unexpected general error occurred while deactivating the user.",
        success: false,
        error,
      });
    }
  };
  

  // --------------------------------------LOGIN----------------------------------------------

export const login = async (req, res) => {
  console.log("User Controller: ");
  console.log("-> Logging user...");
  try {
    const { userLogin, password } = req.body;
    const user = await User.findOne({ 
        $or: [
            {email: userLogin},
            {username: userLogin},
            {phone: userLogin}
        ]
     });
    if (user && await checkPassword(user.password, password)) {
      const loggedUser = {
        uid: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      };
      const token = await generateJwt(loggedUser);
      console.log(`-> Succesfully logged, welcome ${user.username}.`);
      return res.send({
        message: `Auth Controller -> Succesfully logged, welcome ${user.name}`,
        loggedUser,
        token,
        success: true,
      });
    }

    console.log("-> Could not log in, wrong username or password.");
    return res.status(400).send({
      message: "Auth Controller -> Could not log in, wrong username or password.",
      success: false,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred during login.", error);
    return res.status(500).send({
      message: "Auth Controller -> An unexpected general error occurred during login.",
      success: false,
      error,
    });
  }
};