`use strict`

import express from "express"
import morgan  from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRoutes from "../src/auth/auth.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import productRoutes from "../src/product/product.routes.js"

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))
    app.use(helmet())
    app.use(cors())
    app.use(morgan('combined'))
}

const routes = (app) => {
    app.use(authRoutes)
    app.use('/category', categoryRoutes)
    app.use('/product', productRoutes)
}


export const initServer = async () => {
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Express: \n-> Server succesfully started.\n-> Server running on port ${process.env.PORT}.`)
    } catch (error) {
        console.error(`Express: \n->Could not connect to express server on port:${process.env.PORT}.`)        
    }
}