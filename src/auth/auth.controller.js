'use strict';

import User from '../user/user.model.js'; // Ajusta la ruta si es necesario
import { checkPassword, encrypt } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';



export const registerClient = async (req, res) => {
  console.log("Auth Controller: ");
  console.log("-> Registering new user...");
  try {
    const data = req.body;
    const user = new User(data);
    user.password = await encrypt(user.password);
    user.role = 'CLIENT';
    await user.save();
    console.log("-> User registered successfully.");
    return res.send({
      message: `Auth Controller -> Registered successfully. You can log in with username: ${user.username}`,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred during registration.", error);
    return res.status(500).send({
      message: "Auth Controller -> An unexpected general error occurred during registration.",
      success: false,
      error,
    });
  }
};

export const registerAdmin = async (req, res) => {
    console.log("Auth Controller: ");
    console.log("-> Registering new user...");
    try {
      const data = req.body;
      const user = new User(data);
      user.password = await encrypt(user.password);
      user.role = 'ADMIN';
      await user.save();
      console.log("-> User registered successfully.");
      return res.send({
        message: `Auth Controller -> Registered successfully. You can log in with username: ${user.username}`,
        success: true,
      });
    } catch (error) {
      console.error("-> An unexpected general error occurred during registration.", error);
      return res.status(500).send({
        message: "Auth Controller -> An unexpected general error occurred during registration.",
        success: false,
        error,
      });
    }
  };

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