"use strict";

import Commentary from "./commentary.model.js";
import mongoose from "mongoose";

// Crear comentario
export const createCommentary = async (req, res) => {
  console.log("Commentary Controller:");
  console.log("-> Creating a new commentary...");
  try {
    const data = req.body;
    const user = req.user;
    data.author = user.uid;
    const commentary = new Commentary(data);
    await commentary.save();
    console.log("-> Commentary successfully created.");
    return res.send({
      message: "Commentary Controller -> Commentary successfully created.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while creating the commentary.", error);
    return res.status(500).send({
      message: "Commentary Controller -> An unexpected general error occurred while creating the commentary.",
      success: false,
      error,
    });
  }
};

// Obtener todos los comentarios con populate de autor y publicación
export const getAllCommentaries = async (req, res) => {
  console.log("Commentary Controller:");
  console.log("-> Fetching all commentaries...");
  try {
    const commentaries = await Commentary.find()
      .populate("author", "name lastname username email") // Popula el autor con estos campos
      .populate({
        path: "publication",
        populate: { path: "category", select: "name description" }, // Popula la categoría dentro de la publicación
        select: "title content", // Solo selecciona estos campos de la publicación
      });

    if (commentaries.length === 0) {
      console.log("-> No commentaries found.");
      return res.status(404).send({
        message: "Commentary Controller -> No commentaries found.",
        success: false,
      });
    }

    console.log("-> Commentaries found and retrieved successfully.");
    return res.send({
      message: "Commentary Controller -> Commentaries found and retrieved successfully.",
      commentaries,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching commentaries.", error);
    return res.status(500).send({
      message: "Commentary Controller -> An unexpected general error occurred while fetching commentaries.",
      success: false,
      error,
    });
  }
};

// Obtener comentario por ID con populate
export const getCommentaryById = async (req, res) => {
  console.log("Commentary Controller:");
  console.log("-> Fetching commentary by ID...");
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "Commentary Controller -> Invalid ID format provided.",
        success: false,
      });
    }

    const commentary = await Commentary.findById(id)
      .populate("author", "name lastname username email")
      .populate({
        path: "publication",
        populate: { path: "category", select: "name description" },
        select: "title content",
      });

    if (!commentary) {
      console.log("-> Commentary not found with the given ID.");
      return res.status(404).send({
        message: "Commentary Controller -> Commentary not found with the given ID.",
        success: false,
      });
    }

    console.log("-> Commentary successfully found.");
    return res.send({
      message: "Commentary Controller -> Commentary successfully found.",
      commentary,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching the commentary by ID.", error);
    return res.status(500).send({
      message: "Commentary Controller -> An unexpected general error occurred while fetching the commentary by ID.",
      success: false,
      error,
    });
  }
};

// Actualizar comentario
export const updateCommentary = async (req, res) => {
  console.log("Commentary Controller:");
  console.log("-> Updating commentary...");
  try {
    const { id } = req.params;
    const data = req.body;
    const oldCommentary = await Commentary.findById(id);
    
    if (!oldCommentary) {
      console.log("-> Commentary not found for update.");
      return res.status(404).send({
        message: "Commentary Controller -> Commentary not found for update.",
        success: false,
      });
    }
    
    if (data.content) oldCommentary.content = data.content;
    if (data.publication) oldCommentary.publication = data.publication;
    
    const updatedCommentary = await oldCommentary.save();
    console.log("-> Commentary updated successfully.");
    return res.send({
      message: "Commentary Controller -> Commentary updated successfully.",
      success: true,
      updatedCommentary,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the commentary.", error);
    return res.status(500).send({
      message: "Commentary Controller -> An unexpected general error occurred while updating the commentary.",
      success: false,
      error,
    });
  }
};

// Eliminar comentario
export const deleteCommentary = async (req, res) => {
  console.log("Commentary Controller:");
  console.log("-> Deleting commentary...");
  try {
    const {id} = req.params;

    const deletedCommentary = await Commentary.findByIdAndDelete(id);

    if (!deletedCommentary) {
      console.log("-> Commentary not found for deletion.");
      return res.status(404).send({
        message: "Commentary Controller -> Commentary not found for deletion.",
        success: false,
      });
    }

    console.log("-> Commentary successfully deleted.");
    return res.send({
      message: "Commentary Controller -> Commentary successfully deleted.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while deleting the commentary.", error);
    return res.status(500).send({
      message: "Commentary Controller -> An unexpected general error occurred while deleting the commentary.",
      success: false,
      error,
    });
  }
};
