"use strict";

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Importación de rutas
import categoryRoutes from "../src/category/category.routes.js";
import userRoutes from "../src/user/user.routes.js";
import publicationRoutes from "../src/publication/publication.routes.js";
import commentaryRoutes from "../src/commentary/commentary.routes.js";

const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(cors());
    app.use(morgan("combined"));
};

const routes = (app) => {
    app.use("/category", categoryRoutes);
    app.use("/user", userRoutes);
    app.use("/publication", publicationRoutes);
    app.use("/commentary", commentaryRoutes);
};

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Express: \n-> Server successfully started.\n-> Server running on port ${process.env.PORT}.`);
    } catch (error) {
        console.error(`Express: \n-> Could not connect to Express server on port: ${process.env.PORT}.`);
    }
};
