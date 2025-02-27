'use strict';

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

console.log("Cart Controller: ");

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  console.log("-> Adding product to cart...");
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      console.log("-> Quantity must be greater than 0.");
      return res.status(400).send({
        message: "Cart Controller -> Quantity must be greater than 0.",
        success: false,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.log("-> Product not found.");
      return res.status(404).send({
        message: "Cart Controller -> Product not found.",
        success: false,
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    console.log("-> Product added to cart successfully.");
    return res.send({
      message: "Cart Controller -> Product added to cart successfully.",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while adding product to cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while adding product to cart.",
      success: false,
      error,
    });
  }
};

// Obtener carrito del usuario
export const getUserCart = async (req, res) => {
  console.log("-> Fetching user cart...");
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product", "name price");

    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    console.log("-> Cart retrieved successfully.");
    return res.send({
      message: "Cart Controller -> Cart retrieved successfully.",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while fetching user cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while fetching user cart.",
      success: false,
      error,
    });
  }
};

// Actualizar cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
  console.log("-> Updating product quantity in cart...");
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      console.log("-> Quantity must be greater than 0.");
      return res.status(400).send({
        message: "Cart Controller -> Quantity must be greater than 0.",
        success: false,
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      console.log("-> Product quantity updated successfully.");
      return res.send({
        message: "Cart Controller -> Product quantity updated successfully.",
        success: true,
        cart,
      });
    } else {
      console.log("-> Product not found in cart.");
      return res.status(404).send({
        message: "Cart Controller -> Product not found in cart.",
        success: false,
      });
    }
  } catch (error) {
    console.error("-> An unexpected error occurred while updating product quantity.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while updating product quantity.",
      success: false,
      error,
    });
  }
};

// Eliminar producto del carrito
export const removeProductFromCart = async (req, res) => {
  console.log("-> Removing product from cart...");
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    console.log("-> Product removed from cart successfully.");
    return res.send({
      message: "Cart Controller -> Product removed from cart successfully.",
      success: true,
      cart,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while removing product from cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while removing product from cart.",
      success: false,
      error,
    });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  console.log("-> Clearing cart...");
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      console.log("-> Cart not found.");
      return res.status(404).send({
        message: "Cart Controller -> Cart not found.",
        success: false,
      });
    }

    cart.products = [];
    await cart.save();
    console.log("-> Cart cleared successfully.");
    return res.send({
      message: "Cart Controller -> Cart cleared successfully.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while clearing the cart.", error);
    return res.status(500).send({
      message: "Cart Controller -> An unexpected error occurred while clearing the cart.",
      success: false,
      error,
    });
  }
};
