import { type NextFunction ,type Response ,type Request, text} from "express";
import client from "../middlwares/database";
import AppError from "../utils/AppError";

export const getAllUsers = async (req:Request, res:Response, next:NextFunction ) =>{
    try {
        // get all user from the database
        const query = {
            text : ` SELECT * FROM users`
        }

        const result = await client.query(query);
        // if no users return 

        if (result.rows[0].length === 0){
            return next(new AppError("No users found", 403))
        }
        // get resppnse from the server
        res.status(200).json({
            status:"success",
            data:result.rows
        })
    } catch (error) {
        return next( new AppError(`error getting users...`, 500))
    }
}