"use strict";

import Publication from "./publication.model.js";
import mongoose from "mongoose";

export const createPublication = async (req, res) => {
  console.log("Publication Controller:");
  console.log("-> Creating a new publication...");
  try {
    const data = req.body;
    const user = req.user;
    data.author = req.user.uid;
    const publication = new Publication(data);
    await publication.save();
    console.log("-> Publication successfully created.");
    return res.send({
      message: "Publication Controller -> Publication successfully created.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while creating the publication.", error);
    return res.status(500).send({
      message: "Publication Controller -> An unexpected general error occurred while creating the publication.",
      success: false,
      error,
    });
  }
};

export const getAllPublications = async (req, res) => {
  console.log("Publication Controller:");
  console.log("-> Fetching all publications...");
  try {
    const publications = await Publication.find()
      .populate("author", "name lastname username email") // Popula el autor con estos campos
      .populate("category", "name description"); // Popula la categoría con estos campos

    if (publications.length === 0) {
      console.log("-> No publications found.");
      return res.status(404).send({
        message: "Publication Controller -> No publications found.",
        success: false,
      });
    }

    console.log("-> Publications found and retrieved successfully.");
    return res.send({
      message: "Publication Controller -> Publications found and retrieved successfully.",
      publications,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching publications.", error);
    return res.status(500).send({
      message: "Publication Controller -> An unexpected general error occurred while fetching publications.",
      success: false,
      error,
    });
  }
};

export const getPublicationById = async (req, res) => {
  console.log("Publication Controller:");
  console.log("-> Fetching publication by ID...");
  try {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "Publication Controller -> Invalid ID format provided.",
        success: false,
      });
    }

    const publication = await Publication.findById(id)
      .populate("author", "name lastname username email")
      .populate("category", "name description");

    if (!publication) {
      console.log("-> Publication not found with the given ID.");
      return res.status(404).send({
        message: "Publication Controller -> Publication not found with the given ID.",
        success: false,
      });
    }

    console.log("-> Publication successfully found.");
    return res.send({
      message: "Publication Controller -> Publication successfully found.",
      publication,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while fetching the publication by ID.", error);
    return res.status(500).send({
      message: "Publication Controller -> An unexpected general error occurred while fetching the publication by ID.",
      success: false,
      error,
    });
  }
};

export const updatePublication = async (req, res) => {
  console.log("Publication Controller:");
  console.log("-> Updating publication...");
  try {
    const { id } = req.params;
    const data = req.body;
    const oldPublication = await Publication.findById(id);
    
    if (!oldPublication) {
      console.log("-> Publication not found for update.");
      return res.status(404).send({
        message: "Publication Controller -> Publication not found for update.",
        success: false,
      });
    }
    
    if (data.title) oldPublication.title = data.title;
    if (data.content) oldPublication.content = data.content;
    if (data.category) oldPublication.category = data.category;
    
    const updatedPublication = await oldPublication.save();
    console.log("-> Publication updated successfully.");
    return res.send({
      message: "Publication Controller -> Publication updated successfully.",
      success: true,
      updatedPublication,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while updating the publication.", error);
    return res.status(500).send({
      message: "Publication Controller -> An unexpected general error occurred while updating the publication.",
      success: false,
      error,
    });
  }
};

export const deletePublication = async (req, res) => {
  console.log("Publication Controller:");
  console.log("-> Deleting publication...");
  try {
    const {id} = req.params;

    const deletedPublication = await Publication.findByIdAndDelete(id);

    if (!deletedPublication) {
      console.log("-> Publication not found for deletion.");
      return res.status(404).send({
        message: "Publication Controller -> Publication not found for deletion.",
        success: false,
      });
    }

    console.log("-> Publication successfully deleted.");
    return res.send({
      message: "Publication Controller -> Publication successfully deleted.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected general error occurred while deleting the publication.", error);
    return res.status(500).send({
      message: "Publication Controller -> An unexpected general error occurred while deleting the publication.",
      success: false,
      error,
    });
  }
};
