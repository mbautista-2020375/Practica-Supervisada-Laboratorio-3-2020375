import User from '../src/user/user.model.js'
import {checkPassword} from "../utils/encrypt.js"
import { request } from 'express'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const validateOldPassword = async (oldPassword, id) => {
    if (!oldPassword) {
        throw new Error('Old password is required to update the password.');
    }
    const user = await User.findById(id) 
    if (!user) {
        throw new Error('User not found.')
    }
    const verify = await checkPassword(user.password, oldPassword);
    if (!verify) {
        throw new Error('Old password is incorrect.')
    }
    return true; 
};