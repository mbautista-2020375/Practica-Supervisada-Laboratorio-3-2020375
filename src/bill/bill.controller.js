'use strict';

import Bill from "../models/Bill.js"; // Ajusta la ruta si es necesario
import mongoose from "mongoose";

console.log("Bill Controller: ");

// Crear factura
export const createBill = async (req, res) => {
  console.log("-> Creating a new bill...");
  try {
    const data = req.body;
    const bill = new Bill(data);
    await bill.save();
    console.log("-> Bill successfully created.");
    return res.send({
      message: "Bill Controller -> Bill successfully created.",
      success: true,
      bill,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while creating the bill.", error);
    return res.status(500).send({
      message: "Bill Controller -> An unexpected error occurred while creating the bill.",
      success: false,
      error,
    });
  }
};

// Obtener todas las facturas
export const getAllBills = async (req, res) => {
  console.log("-> Fetching all bills...");
  try {
    const bills = await Bill.find().populate("user", "name email").populate("products.product", "name price");
    if (bills.length === 0) {
      console.log("-> No bills found.");
      return res.status(404).send({
        message: "Bill Controller -> No bills found.",
        success: false,
      });
    }
    console.log("-> Bills found and retrieved successfully.");
    return res.send({
      message: "Bill Controller -> Bills found and retrieved successfully.",
      bills,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while fetching bills.", error);
    return res.status(500).send({
      message: "Bill Controller -> An unexpected error occurred while fetching bills.",
      success: false,
      error,
    });
  }
};

// Obtener factura por ID
export const getBillById = async (req, res) => {
  console.log("-> Fetching bill by ID...");
  try {
    const id = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("-> Invalid ID format provided.");
      return res.status(400).send({
        message: "Bill Controller -> Invalid ID format provided.",
        success: false,
      });
    }

    const bill = await Bill.findById(id)
      .populate("user", "name email")
      .populate("products.product", "name price");

    if (!bill) {
      console.log("-> Bill not found with the given ID.");
      return res.status(404).send({
        message: "Bill Controller -> Bill not found with the given ID.",
        success: false,
      });
    }

    console.log("-> Bill successfully found.");
    return res.send({
      message: "Bill Controller -> Bill successfully found.",
      bill,
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while fetching the bill by ID.", error);
    return res.status(500).send({
      message: "Bill Controller -> An unexpected error occurred while fetching the bill by ID.",
      success: false,
      error,
    });
  }
};

// Actualizar factura
export const updateBill = async (req, res) => {
  console.log("-> Updating bill...");
  try {
    const id = req.params._id;
    const data = req.body;

    const updatedBill = await Bill.findByIdAndUpdate(id, data, { new: true }).populate("user", "name email").populate("products.product", "name price");

    if (!updatedBill) {
      console.log("-> Bill not found for update.");
      return res.status(404).send({
        message: "Bill Controller -> Bill not found for update.",
        success: false,
      });
    }

    console.log("-> Bill updated successfully.");
    return res.send({
      message: "Bill Controller -> Bill updated successfully.",
      success: true,
      updatedBill,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while updating the bill.", error);
    return res.status(500).send({
      message: "Bill Controller -> An unexpected error occurred while updating the bill.",
      success: false,
      error,
    });
  }
};

// Eliminar factura
export const deleteBill = async (req, res) => {
  console.log("-> Deleting bill...");
  try {
    const id = req.params._id;

    const deletedBill = await Bill.findByIdAndDelete(id);

    if (!deletedBill) {
      console.log("-> Bill not found for deletion.");
      return res.status(404).send({
        message: "Bill Controller -> Bill not found for deletion.",
        success: false,
      });
    }

    console.log("-> Bill successfully deleted.");
    return res.send({
      message: "Bill Controller -> Bill successfully deleted.",
      success: true,
    });
  } catch (error) {
    console.error("-> An unexpected error occurred while deleting the bill.", error);
    return res.status(500).send({
      message: "Bill Controller -> An unexpected error occurred while deleting the bill.",
      success: false,
      error,
    });
  }
};
