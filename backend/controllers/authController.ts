import { type NextFunction, type Response, type Request } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import client from "../middlwares/database";
import sendMail from "../utils/email";
import { genarateResetToken } from "../utils/resetToken";
import AppError from "../utils/AppError";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, phoneNumber, role = "customer" } = req.body; // Default role is "customer"

        // Validate required fields
        if (!username || !email || !password) {
            return next(new AppError("Username, email, and password are required.", 400));
        }

        // Check if the user already exists
        const query = {
            text: 'SELECT 1 FROM users WHERE email = $1',
            values: [email],
        };

        const result = await client.query(query);

        if (result.rows.length > 0) {
            return next(new AppError("This user already exists", 403));
        }

        // Hash the password
        const hashedPassword = await Bun.password.hash(password);

        // Insert the user into the database
        const insertQuery = {
            text: `INSERT INTO users(username, email, password, phoneNumber, role) 
                   VALUES($1, $2, $3, $4, $5) RETURNING *`,
            values: [username, email, hashedPassword, phoneNumber, role],
        };

        const insertResult = await client.query(insertQuery);

        // Assign JWT token
        const token = jwt.sign({ id: insertResult.rows[0].id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES });

        res.status(201).json({
            status: "User created successfully",
            token,
            data: insertResult.rows[0],
        });
    } catch (error: any) {
        console.error(`Error creating user: ${error.message}`);
        return next(new AppError("An error occurred while creating the user.", 500));
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
            text: 'SELECT * FROM users WHERE email = $1',
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
            text: `SELECT id, username, email, role FROM users WHERE id = $1`,
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
            text: `SELECT username, email FROM users WHERE email = $1`,
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
                       SET passwordResetToken = $1, passwordResetExpiresAt = $2 
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

// Resetting password
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pin, password } = req.body;

        if (!pin || !password) {
            return next(new AppError("Reset token and password are required", 400));
        }

        // Hash the reset token
        const passToken = crypto.createHash("sha256").update(pin.toString()).digest("hex");

        // Fetch the user with the reset token
        const fetchUserQuery = {
            text: `
                SELECT username, email, passwordResetExpiresAt 
                FROM users 
                WHERE passwordResetToken = $1
            `,
            values: [passToken],
        };

        const fetchResult = await client.query(fetchUserQuery);

        if (!fetchResult.rows || fetchResult.rows.length === 0) {
            return next(new AppError("Token is invalid or does not exist", 401));
        }

        const user = fetchResult.rows[0];

        // Check if the reset token has expired
        const tokenExpiry = new Date(user.passwordResetExpiresAt);

        if (tokenExpiry < new Date()) {
            return next(new AppError("Reset token has expired", 401));
        }

        // Proceed to update the password
        const updateQuery = {
            text: `
                UPDATE users 
                SET passwordResetToken = NULL, 
                    passwordResetExpiresAt = NULL, 
                    password = $2
                WHERE passwordResetToken = $1
                RETURNING username, email;
            `,
            values: [passToken, await Bun.password.hash(password)],
        };

        const updateResult = await client.query(updateQuery);

        // Respond to the client
        const updatedUser = updateResult.rows[0];

        // assign a jwt token
        const token = jwt.sign({id: updatedUser.id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES });

        res.status(200).json({
            status: "success",
            token: token,
            message: `Password updated successfully for user ${updatedUser.username}`,
        });
    } catch (error) {
        console.error(`Error resetting password: ${error}`);
        return next(new AppError("An error occurred while resetting the password", 500));
    }
};

export const updatePassword = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return next(new AppError("Current and new passwords are required", 400));
        }

        const userId = req.user.id;

        // Fetch the user data
        const fetchUserQuery = {
            name: 'fetch-user-data',
            text: `
                SELECT username, email, password 
                FROM users 
                WHERE id = $1
            `,
            values: [userId],
        };

        const userResult = await client.query(fetchUserQuery);

        if (!userResult.rows || userResult.rows.length === 0) {
            return next(new AppError("User not found", 403));
        }

        const user = userResult.rows[0];

        // Verify the current password
        const isMatch = await Bun.password.verify(currentPassword, user.password);

        if (!isMatch) {
            return next(new AppError("Your current password is incorrect", 403));
        }

        // Hash the new password
        const hashedPassword = await Bun.password.hash(newPassword);

        // Update the password
        const updatePasswordQuery = {
            text: `
                UPDATE users 
                SET password = $1 
                WHERE id = $2
                RETURNING username, email;
            `,
            values: [hashedPassword, userId],
        };

        const updateResult = await client.query(updatePasswordQuery);

        // Respond with the updated user details
        res.status(200).json({
            status: 'success',
            data: updateResult.rows[0],
        });

    } catch (error) {
        console.error(`Error updating user password: ${error}`);
        return next(new AppError("An error occurred while updating the password", 500));
    }
};