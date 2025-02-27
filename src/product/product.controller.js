'use strict';

import Product from "./product.model.js"; // Ajusta la ruta según tu estructura de archivos
import mongoose from "mongoose";

console.log("Product Controller: ");

// Crear producto
export const createProduct = async (req, res) => {
  console.log("-> Creating a new product...");
  try {
    const data = req.body;
    const product = new Product(data);
    await product.save();
    console.log("-> Product successfully created.");
    return res.send({
      message: "Product Controller -> Product successfully created.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while creating a product.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while creating a product.",
      success: false,
      error,
    });
  }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  console.log("-> Fetching all products...");
  try {
    const products = await Product.find();
    if (products.length === 0) {
      console.log("-> No products were found for the required call.");
      return res.status(404).send({
        message: "Product Controller -> No products were found for the required call.",
        success: false,
      });
    }
    console.log("-> Products found and retrieved successfully.");
    return res.send({
      message: "Product Controller -> Products found and retrieved successfully.",
      products,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching products.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while fetching products.",
      success: false,
      error,
    });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  console.log("-> Fetching product by ID...");
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "Product Controller -> Invalid ID format provided.",
        success: false,
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      console.log("-> Product not found with the given ID.");
      return res.status(404).send({
        message: "Product Controller -> Product not found with the given ID.",
        success: false,
      });
    }

    console.log("-> Product successfully found.");
    return res.send({
      message: "Product Controller -> Product successfully found.",
      product,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching the product by ID.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while fetching the product by ID.",
      success: false,
      error,
    });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  console.log("-> Updating product...");
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!updatedProduct) {
      console.log("-> Product not found for update.");
      return res.status(404).send({
        message: "Product Controller -> Product not found for update.",
        success: false,
      });
    }

    console.log("-> Product updated successfully.");
    return res.send({
      message: "Product Controller -> Product updated successfully.",
      success: true,
      updatedProduct,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the product.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while updating the product.",
      success: false,
      error,
    });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  console.log("-> Deleting product...");
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log("-> Product not found for deletion.");
      return res.status(404).send({
        message: "Product Controller -> Product not found for deletion.",
        success: false,
      });
    }

    console.log("-> Product successfully deleted.");
    return res.send({
      message: "Product Controller -> Product successfully deleted.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while deleting the product.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while deleting the product.",
      success: false,
      error,
    });
  }
};


// --------------------- EXTRA CRUD FUNCTIONS --------------------------------

export const listAvailableProducts = async (req, res) => {
  console.log("-> Fetching all products...");
  try {
    const products = await Product.find({stock: {$gt: 0}});
    if (products.length === 0) {
      console.log("-> No products were found for the required call.");
      return res.status(404).send({
        message: "Product Controller -> No products were found for the required call.",
        success: false,
      });
    }
    console.log("-> Available products found and retrieved successfully.");
    return res.send({
      message: "Product Controller -> Available products found and retrieved successfully.",
      products,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching products.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while fetching products.",
      success: false,
      error,
    });
  }
};

export const listUnavailableProducts = async (req, res) => {
  console.log("-> Fetching all products...");
  try {
    const products = await Product.find({stock: {$eq: 0}});
    if (products.length === 0) {
      console.log("-> No products were found for the required call.");
      return res.status(404).send({
        message: "Product Controller -> No products were found for the required call.",
        success: false,
      });
    }
    console.log("-> Unavailable products found and retrieved successfully.");
    return res.send({
      message: "Product Controller -> Unavailable products found and retrieved successfully.",
      products,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching products.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while fetching products.",
      success: false,
      error,
    });
  }
}

export const listTopSellers = async (req, res) => {
  console.log("-> Fetching all products...");
  try {
    const products = await Product.find({stock: {$gt: 0}, sold: {$gt: 0}})
      .sort({sold: -1})
      .limit(10);
    if (products.length === 0) {
      console.log("-> No products were found for the required call.");
      return res.status(404).send({
        message: "Product Controller -> No products were found for the required call.",
        success: false,
      });
    }
    console.log("-> Top 10 products on sells found and retrieved successfully.");
    return res.send({
      message: "Product Controller -> Top 10 products on sells found and retrieved successfully.",
      products,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching products.", error);
    return res.status(500).send({
      message: "Product Controller -> An unexpected general error occurred while fetching products.",
      success: false,
      error,
    });
  }
}