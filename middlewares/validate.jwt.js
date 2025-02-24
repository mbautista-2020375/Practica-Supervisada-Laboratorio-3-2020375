`use strict`

import jwt from "jsonwebtoken"



export const validateJwt = async(req, res, next) => {
    console.log("JSON Web Token:")
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers
        if (!authorization) {
            console.log("-> You're not authorized cause you're not logged in.")
            return res.status(401).send({
                message: "JSON Web Token -> You're not authorized cause you're not logged in.",
                success: false
            })
        }
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        console.log("-> User succesfully verified.")
        next()
    } catch (error) {
        console.error(`-> An unexpected error ocurred while validating current JSON Web Token: `, error)
        res.status(500).send({
            message: "JSON Web Token -> An unexpected error ocurred while validating current JSON Web Token:  ",
            success: false, 
            error: error
        })
    }
}