"use strict";

import { Router } from "express";
import {
  createCommentary,
  getAllCommentaries,
  getCommentaryById,
  updateCommentary,
  deleteCommentary
} from "./commentary.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { createCommentaryValidator, editCommentaryValidator } from "../../validators/commentary.validators.js";
import { verifyCommentaryOwnership } from "../../middlewares/commentary.owner.js";

const api = Router();

api.post("/comment/", [validateJwt, createCommentaryValidator], createCommentary);
api.get("/commentaries/", validateJwt, getAllCommentaries);
api.get("/commentary/:id", validateJwt, getCommentaryById);
api.put("/editcommentary/:id", [validateJwt, verifyCommentaryOwnership ,editCommentaryValidator], updateCommentary);
api.delete("/deletecommentary/:id", [validateJwt, verifyCommentaryOwnership], deleteCommentary);

export default api;
