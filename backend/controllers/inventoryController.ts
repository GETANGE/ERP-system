import { type NextFunction, type Response, type Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
import AppError from "../utils/AppError";
import client from "../middlwares/database";

dotenv.config();

export const getAllInventory = async function(req:Request, res:Response , next:NextFunction){
    try {
        const query = {
            name: "fetch-inventories",
            text: "SELECT * FROM inventory",
        };

        const result = await client.query(query);

        if(result.rows.length > 0){
            return next(new AppError("No inventories found", 404))
        }

        res.status(200).json({
            status: "success",
            suppliers: result.rows,
        });
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        return next(new AppError("Error getting all suppliers", 500));
    }
}

export const createInventory = async function(req:any, res:Response , next:NextFunction){
    try {
        const authHeaders = req.headers.authorization;
    
        if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
          return next(new AppError("Authorization token missing or invalid", 401));
        }
    
        const token = authHeaders.split(" ")[1];
    
        // Decode token
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
        const { product_name, description, stock_level } = req.body;
    
        // Validate required fields
        if (!product_name || !description || !stock_level) {
          return next(new AppError("Product name, description, and stock level are required", 400));
        }
    
        const query = {
          text: "INSERT INTO inventory(product_name, description, stock_level, supplier_id) VALUES($1, $2, $3, $4) RETURNING *",
          values: [product_name, description, stock_level, decodeToken.id],
        };
    
        const createInventory = await client.query(query);
    
        res.status(201).json({
          status: "success",
          inventory: createInventory.rows[0],
        });
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
        return next(new AppError("Error creating inventory", 500));
      }
}

// Update inventory
export const updateInventory = async function(req:Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;
        const { product_name, description, stock_level } = req.body;
    
        // Ensure at least one field is provided for update
        if (!product_name && !description && !stock_level) {
          return next(new AppError("At least one field is required for update", 400));
        }
    
        // Build dynamic SQL query
        const fieldsToUpdate: string[] = [];
        const values: any[] = [];
        
        if (product_name) {
          fieldsToUpdate.push(`product_name = $${values.length + 1}`);
          values.push(product_name);
        }
        if (description) {
          fieldsToUpdate.push(`description = $${values.length + 1}`);
          values.push(description);
        }
        if (stock_level) {
          fieldsToUpdate.push(`stock_level = $${values.length + 1}`);
          values.push(stock_level);
        }
    
        values.push(id);
    
        const query = {
          text: `UPDATE inventory SET ${fieldsToUpdate.join(", ")} WHERE id = $${values.length} RETURNING *`,
          values,
        };
    
        // Execute the update query
        const updatedInventory = await client.query(query);
    
        // Check if the inventory item exists
        if (updatedInventory.rowCount === 0) {
          return next(new AppError("Inventory item not found", 404));
        }
    
        res.status(200).json({
          status: "success",
          inventory: updatedInventory.rows[0],
        });
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
        return next(new AppError("Error updating inventory", 500));
      }
}