import { type NextFunction, type Response, type Request, response, text } from "express";
import jwt from "jsonwebtoken";

import client from "../middlwares/database";
import sendMail from "../utils/email";
import { genarateResetToken } from "../utils/resetToken";
import AppError from "../utils/AppError";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, password, role, phoneNumber } = req.body;

        const query = {
            // name: 'fetch-user',
            text: 'SELECT 2 FROM users WHERE email = $1',
            values: [email],
        };

        const result = await client.query(query);

        if (result.rows.length > 0) {
            return next ( new AppError("This user already exists", 403))
        }

        // hash the password
        const hashedPassword = await Bun.password.hash(password)

        const insertQuery = {
            text: `INSERT INTO users(userName, email, password, phoneNumber, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            values: [userName, email, hashedPassword, phoneNumber, role],
        };

        const insertResult = await client.query(insertQuery);

        //assign jwt token
        const token = jwt.sign({id:insertResult.rows[0].id}, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES })

        res.status(201).json({
            status: "User created successfully",
            token:token,
            data: insertResult.rows[0],
        });
    } catch (error:any) {
        console.error(`Error creating user: ${error}`);
        return next (new AppError("An error occurred while creating the user.", 500));
    }
};

// Login in users
export const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email , password } = req.body;

        if(!email || !password) {
            return next(new AppError("Missing email or password.", 403))
        } 

        // check if the email exists in the database
        const query = {
            name: 'fetch-user',
            text: 'SELECT userName, email FROM users WHERE email = $1',
            values: [email],
        };

        const result = await client.query(query);

        if(!result) {
            return next( new AppError("This user does not exists", 403))
        }

        //check if passwords match
        const isMatch = await Bun.password.verify(password, result.rows[0].password);

        if(!isMatch){
            return next( new AppError("Invalid username or password", 403))
        }

        // assign a token
        const token = jwt.sign({id:result.rows[0].id}, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES });

        res.status(200).json({
            status:"success",
            token:token,
            data: result.rows[0]
        })
    } catch (error) {
        console.log(`Error logging in user: ${error}`);
        return next(new AppError("An error occured while logging in user.", 500))
    }
}

// protecting routes
export const protect = async (req: any, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next( new AppError("You are not logged In (Authorizations).", 403))
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        const userId = decodedToken.id;

        if (!userId) {
            return next( new AppError("Invalid token.", 403))
        }

        const query = {
            name: `fetch-user`,
            text: `SELECT id, userName, email, role FROM users WHERE id = $1`,
            values: [userId],
        };

        const result = await client.query(query);

        if (result.rows.length === 0) {
            return next( new AppError("User not found.", 404))
        }

        req.user = result.rows[0];
        next(); 
    } catch (error: any) {
        console.error(`Protect Middleware Error: ${error.message}`);
        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid or expired token.", 401));
        } else {
            return next (new AppError("An error occurred while protecting this route.", 500));
        }
    }
};

// configurable middlware (Authorizations)
export const restrictTo = (...role:string[])=>{
    return(req:any, res:Response, next:NextFunction)=>{
        if(!role.includes(req.user.role)){
            return next(new AppError("Not authorized to perform this action",403))
        }
        next();
    }
    
}

// forgot password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the user's email
        const { email } = req.body;

        if (!email) {
            return next (new AppError("Email is required", 400))
        }

        // Check if the user exists
        const query = {
            name: "fetch-email",
            text: `SELECT userName, email FROM users WHERE email = $1`,
            values: [email],
        };

        const result = await client.query(query);

        if (!result.rows || result.rows.length === 0) {
            return next (new AppError("User not found", 404))
        }

        const user = result.rows[0];

        // Generate the reset token
        const { resetToken, passwordExpiresAt, passwordResetToken } = genarateResetToken();

        // Email content
        const content = {
            heading: "Password Reset Request",
            body: `
                <p>Dear ${user.username},</p>
                <p>You requested a password reset. Use the token below to reset your password:</p>
                <p><strong>${resetToken}</strong></p>
                <p>This token is valid for 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        try {
            // Send the reset token to the user
            await sendMail(
                process.env.RESEND_EMAIL!, 
                "Password Reset Request", 
                user.email, 
                content
            );

            // Update the reset token in the database
            const updateQuery = {
                text: `UPDATE users 
                       SET passwordResetToken = $1, passwordExpiresAt = $2 
                       WHERE email = $3`,
                values: [passwordResetToken, passwordExpiresAt, email],
            };

            await client.query(updateQuery);

            // Respond to the user
            res.status(200).json({
                status: "success",
                message: "Reset token sent to email",
            });
        } catch (emailError) {
            console.error(`Error trying to send email: ${emailError}`);
            return next(new AppError("Error sending email", 500))
        }
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return next(new AppError("Something went wrong. Please try again later.", 500))
    }
};