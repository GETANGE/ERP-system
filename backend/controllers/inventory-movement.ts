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

export const createInventMovement = async function( req:Request, res:Response, next:NextFunction) {
    try {
        const authHeaders = req.headers.authorization;
    
        if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
          return next(new AppError("Authorization token missing or invalid", 401));
        }
    
        const token = authHeaders.split(" ")[1];
    
        // Decode token
        const decodeToken = jwt.decode(token);

        // Object body
        const { inventory_id, movement_type, quantity} = req.body;

        const createMovement = await client.query({
            text: 'INSERT INTO inventory_movements(inventory_id, movement_type, quantity) VALUES($1, $2, $3) RETURNING *',
            values: [inventory_id, movement_type, quantity]
        })

        res.status(200).json({
            status:"success",
            movements: createMovement.rows[0]
        })
    } catch (error) {
        return next(new AppError("Error creating Inventory movement", 500))
    }
}