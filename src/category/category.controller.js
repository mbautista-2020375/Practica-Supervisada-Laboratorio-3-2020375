`use strict`

import Category from "./category.model.js";
import Publication from "../product/product.model.js"
import mongoose from "mongoose";


// Crear categoría
export const createCategory = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Creating a new category...");
  try {
    const data = req.body;
    const category = new Category(data);
    await category.save();
    console.log("-> Category successfully created.");
    return res.send({
      message: "Category Controller -> Category successfully created.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while creating the category.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while creating the category.",
      success: false,
      error,
    });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Fetching all categories...");
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      console.log("-> No categories found.");
      return res.status(404).send({
        message: "Category Controller -> No categories found.",
        success: false,
      });
    }
    console.log("-> Categories found and retrieved successfully.");
    return res.send({
      message: "Category Controller -> Categories found and retrieved successfully.",
      categories,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching categories.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while fetching categories.",
      success: false,
      error,
    });
  }
};

// Obtener categoría por ID
export const getCategoryById = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Fetching category by ID...");
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "Category Controller -> Invalid ID format provided.",
        success: false,
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      console.log("-> Category not found with the given ID.");
      return res.status(404).send({
        message: "Category Controller -> Category not found with the given ID.",
        success: false,
      });
    }

    console.log("-> Category successfully found.");
    return res.send({
      message: "Category Controller -> Category successfully found.",
      category,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching the category by ID.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while fetching the category by ID.",
      success: false,
      error,
    });
  }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Updating category...");
  try {
    const { id } = req.params;
    const data = req.body;
    const oldCategory = await Category.findById(id);
    
    if (!oldCategory) {
      console.log("-> Category not found for update.");
      return res.status(404).send({
        message: "Category Controller -> Category not found for update.",
        success: false,
      });
    }
    
    if (data.name) oldCategory.name = data.name;
    if (data.description) oldCategory.description = data.description;
    
    const updatedCategory = await oldCategory.save();
    console.log("-> Category updated successfully.");
    return res.send({
      message: "Category Controller -> Category updated successfully.",
      success: true,
      updatedCategory,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the category.", error);
    return res.status(500).send({
      message: "Category Controller -> An unexpected general error occurred while updating the category.",
      success: false,
      error,
    });
  }
};


export const deleteCategory = async (req, res) => {
  console.log("Category Controller: ");
  console.log("-> Marking category as deleted...");

  try {
      const { id } = req.params;
      const categoryToDelete = await Category.findById(id);
      if (!categoryToDelete) {
          console.log("-> Category not found for deletion.");
          return res.status(404).send({
              message: "Category Controller -> Category not found for deletion.",
              success: false,
          });
      }
      const defaultCategory = await Category.findOne({ name: "Not Assigned" });
      if (!defaultCategory) {
          console.log("-> Default category not found. Cannot proceed.");
          return res.status(500).send({
              message: "Category Controller -> Default category not found. Cannot proceed.",
              success: false,
          });
      }
      await Product.updateMany(
          { category: id }, 
          { category: defaultCategory._id }
      );
      console.log("-> All related publications reassigned to default category.");
      const updatedCategory = await Category.findByIdAndUpdate(
          id, 
          { name: `deleted-category ${id}`, description: "not available", status: false }, 
          { new: true }
      );

      console.log("-> Category marked as deleted successfully.");
      return res.send({
          message: "Category Controller -> Category marked as deleted successfully.",
          success: true,
          updatedCategory,
      });

  } catch (error) {
      console.error("-> An unexpected error occurred while marking the category as deleted.", error);
      return res.status(500).send({
          message: "Category Controller -> An unexpected error occurred while marking the category as deleted.",
          success: false,
          error,
      });
  }
};
  

