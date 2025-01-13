import { type NextFunction, type Response, type Request, response } from "express";
import jwt from "jsonwebtoken";

import client from "../middlwares/database";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, password, role, phoneNumber } = req.body;

        const query = {
            name: 'fetch-user',
            text: 'SELECT 2 FROM users WHERE email = $1',
            values: [email],
        };

        const result = await client.query(query);

        if (result.rows.length > 0) {
            return next (
                res.status(400).json({
                    status: "User already exists",
                    data: result.rows[0],
                })
            );
        }

        // hash the password
        const hashedPassword = await Bun.password.hash(password)

        const insertQuery = {
            text: `INSERT INTO users(userName, email, password, phoneNumber, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            values: [userName, email, hashedPassword, phoneNumber, role],
        };

        const insertResult = await client.query(insertQuery);

        //assign jwt token
        const token = jwt.sign({id:insertResult.rows[0].id}, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRES})

        res.status(201).json({
            status: "User created successfully",
            token:token,
            data: insertResult.rows[0],
        });
    } catch (error:any) {
        console.error(`Error creating user: ${error}`);
        return next (
            res.status(500).json({
            status: "Error",
            message: "An error occurred while creating the user.",
        }));
    }
};

// Login in users
export const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email , password } = req.body;

        if(!email || !password) {
            return next(
                res.status(403).json({
                    message: "Missing email or password."
                })
            )
        } 

        // check if the email exists in the database
        const query = {
            name: 'fetch-user',
            text: 'SELECT email, password FROM users WHERE email = $1',
            values: [email],
        };

        const result = await client.query(query);

        if(!result) {
            return next(
                res.status(403).json({
                    message: "This user does not exists"
                })
            )
        }

        //check if passwords match
        const isMatch = await Bun.password.verify(password, result.rows[0].password);

        if(!isMatch){
            return next(
                res.status(403).json({
                    message:"Invalid unsername or password"
                })
            )
        }

        // assign a token
        const token = jwt.sign({id:result.rows[0].id}, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRES
        })

        res.status(200).json({
            status:"success",
            token:token,
            data: result.rows[0]
        })
    } catch (error) {
        console.log( `Error logging in user: ${error}`);
        return next(
            res.status(500).json({
                status: "Error",
                message: "An error occured while logging in user."
            })
        )
    }
}

// protecting routes