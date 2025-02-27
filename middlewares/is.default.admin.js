import User from "../src/user/user.model.js";

export const defaultAdminPermission = async(req, res, next)=>{
    console.log("Default admin verification: ");
    
    try{
        const { user } = req
        const defaultAdmin = await User.findOne({name: 'Administrator'})
        if(user !== defaultAdmin._id){ 
            console.log(`-> You dont have access to execute this action| username ${user.username}, only the main admin can proceed.`);
            return res.status(403).send(
            {
                success: false,
                message: `Admin verification -> You dont have access to execute this action| username ${user.username}, only the main admin can proceed.`
            }
            
        )
        
    }
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Admin verification -> Unauthorized role'
            }
        )
    }
}

import User from "../src/user/user.model.js";

export const denyIfDefault = async(req, res, next)=>{
    console.log("Default admin verification: ");
    
    try{
        const { user } = req
        const defaultAdmin = await User.findOne({name: 'Administrator'})
        if(user == defaultAdmin._id){ 
            console.log(`-> You cant edit or delete this user, main admin must stay.`);
            return res.status(403).send(
            {
                success: false,
                message: `Admin verification -> You cant edit or delete this user, main admin must stay.`
            }
            
        )
        
    }
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Admin verification -> Unauthorized role'
            }
        )
    }
}