import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import client from "../middlwares/database";

export const getAllMovements = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await client.query({
            name: "fetch-invent-mov",
            text: `
                SELECT
                    im.id AS inventory_movement_id,
                    im.movement_type,
                    im.quantity,
                    im.created_at,
                    i.id AS inventory_id,
                    i.product_name,
                    i.description,
                    i.stock_level,
                    i.supplier_id,
                    i.created_at AS inventory_created_at,
                    i.updated_at AS inventory_updated_at
                FROM
                    inventory_movements im
                JOIN
                    inventory i ON im.inventory_id = i.id;
            `
        });

        if(result.rows.length === 0){
            return next(new AppError("No movements found", 404))
        }

        res.status(200).json({
            status: 'success',
            data: result.rows
        });
    } catch (error) {
        return next(new AppError("Error getting Inventory movement", 500));
    } 
};

export const getInventoryMovementById = async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
  
      // Fetch the inventory movement by ID
      const result = await client.query({
        text: "SELECT * FROM inventory_movements WHERE id = $1",
        values: [id],
      });
  
      // Check if the inventory movement exists
      if (result.rows.length === 0) {
        return next(new AppError("Inventory movement not found", 404));
      }
  
      res.status(200).json({
        status: "success",
        movement: result.rows[0],
      });
    } catch (error) {
      return next(new AppError("Error retrieving Inventory movement", 500));
    }
};  

export const createInventMovement = async function (req: Request, res: Response, next: NextFunction) {
    try {
      // Object body
      const { inventory_id, movement_type, quantity } = req.body;
  
      const createMovement = await client.query({
        text: "INSERT INTO inventory_movements(inventory_id, movement_type, quantity) VALUES($1, $2, $3) RETURNING *",
        values: [inventory_id, movement_type, quantity],
      });
  
      res.status(200).json({
        status: "success",
        movements: createMovement.rows[0],
      });
    } catch (error) {
      return next(new AppError("Error creating Inventory movement", 500));
    }
  };

export const updateInventoryMovement = async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { inventory_id, movement_type, quantity } = req.body;
  
      // Check if the inventory movement exists
      const existingMovement = await client.query({
        text: "SELECT * FROM inventory_movements WHERE id = $1",
        values: [id],
      });
  
      if (existingMovement.rows.length === 0) {
        return next(new AppError("Inventory movement not found", 404));
      }
  
      // Update the inventory movement
      const updatedMovement = await client.query({
        text: `
          UPDATE inventory_movements
          SET inventory_id = $1, movement_type = $2, quantity = $3, updated_at = NOW()
          WHERE id = $4
          RETURNING *;
        `,
        values: [inventory_id, movement_type, quantity, id],
      });
  
      res.status(200).json({
        status: "success",
        movement: updatedMovement.rows[0],
      });
    } catch (error) {
      return next(new AppError("Error updating Inventory movement", 500));
    }
};
  
export const deleteMovement = async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const authHeaders = req.headers.authorization;
  
      if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return next(new AppError("Authorization token missing or invalid", 401));
      }
  
      const token = authHeaders.split(" ")[1];
  
      // Verify token
      let decodedToken:any;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
      } catch (err) {
        return next(new AppError("Invalid token", 401));
      }
  
      // Check if the user exists in the database
      const currentUser = await client.query({
        text: "SELECT id, username FROM users WHERE id = $1",
        values: [decodedToken.id],
      });
  
      if (currentUser.rows.length === 0) {
        return next(new AppError("User not found", 404));
      }
  
      // Delete the inventory movement
      const deleteResult = await client.query({
        name: "delete-inventory-mov",
        text: "DELETE FROM inventory_movements WHERE id = $1 RETURNING *",
        values: [id],
      });
  
      if (deleteResult.rowCount === 0) {
        return next(new AppError("Inventory movement not found", 404));
      }
  
      res.status(200).json({
        status: "success",
        message: "Inventory movement deleted successfully",
      });
    } catch (error) {
      return next(new AppError("Error deleting Inventory movement", 500));
    }
  };