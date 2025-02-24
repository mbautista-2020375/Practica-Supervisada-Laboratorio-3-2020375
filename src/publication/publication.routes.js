"use strict";

import { Router } from "express";
import {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from "./publication.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { createPublicationValidator, editPublicationValidator } from "../../validators/publication.validators.js";
import { verifyPublicationOwnership } from "../../middlewares/publication.owner.js";

const api = Router();

//Requiere inicio de sesion
api.post("/publicate/",[validateJwt, createPublicationValidator], createPublication);
api.get("/publications/",validateJwt ,getAllPublications);
api.get("/publication/:id",validateJwt, getPublicationById);
api.put("/editpublication/:id",[validateJwt, verifyPublicationOwnership ,editPublicationValidator],updatePublication);
api.delete("/deletepublication/:id",[validateJwt, verifyPublicationOwnership], deletePublication);

export default api;
