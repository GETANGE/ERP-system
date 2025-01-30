import { type NextFunction, type Response, type Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
import AppError from "../utils/AppError";
import client from "../middlwares/database";

dotenv.config();

export const getAllInventory = async function (req: Request, res: Response, next: NextFunction) {
  try {
      const query = {
          name: "fetch-inventories",
          text: `
              SELECT 
                  i.id AS inventory_id, i.product_name, i.description, i.stock_level, i.created_at,
                  u.id AS supplier_id, u.username AS supplier_name, u.email AS supplier_email, u.phoneNumber AS supplier_phone
              FROM inventory i
              LEFT JOIN users u ON i.supplier_id = u.id
          `,
      };

      const result = await client.query(query);

      if (result.rows.length === 0) {
          return next(new AppError("No inventories found", 404));
      }

      res.status(200).json({
          status: "success",
          inventories: result.rows,
      });
  } catch (error: any) {
      console.error(`Error: ${error.message}`);
      return next(new AppError("Error getting all inventories", 500));
  }
};

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

// delete an inventory
export const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Check whether the inventory exists
    const inventory = await client.query({
      name: "fetch-inventory",
      text: "SELECT * FROM inventory WHERE id = $1",
      values: [id],
    });

    if (inventory.rows.length === 0) {
      return next(new AppError("This inventory does not exist", 404));
    }

    // Get the creator's ID from the request token
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return next(new AppError("Authorization token missing or invalid", 401));
    }

    const token = authHeaders.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Get the supplier's ID from the inventory record
    const supplier = inventory.rows[0];

    if (decodeToken.id !== supplier.supplier_id) {
      return next(new AppError("You are not allowed to perform this action", 403));
    }

    // Delete the inventory item
    await client.query({
      name: "delete-inventory",
      text: "DELETE FROM inventory WHERE id = $1",
      values: [id],
    });

    res.status(200).json({
      status: "success",
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    return next(new AppError("Error deleting inventory", 500));
  }
};

// get a single inventory
export const getSingleInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Fetch inventory along with supplier details
    const inventory = await client.query({
      name: "fetch-inventory-with-supplier",
      text: `
        SELECT 
          i.id AS inventory_id, i.product_name, i.description, i.stock_level, i.created_at,
          u.id AS supplier_id, u.username AS supplier_name, u.email AS supplier_email, u.phoneNumber AS supplier_phone, u.imageUrl AS supplier_image
        FROM inventory i
        LEFT JOIN users u ON i.supplier_id = u.id
        WHERE i.id = $1
      `,
      values: [id],
    });

    // Check if inventory exists
    if (inventory.rows.length === 0) {
      return next(new AppError("Inventory not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        inventory: {
          id: inventory.rows[0].inventory_id,
          name: inventory.rows[0].product_name,
          description: inventory.rows[0].description,
          stock_level: inventory.rows[0].stock_level,
          created_at: inventory.rows[0].created_at,
        },
        supplier: inventory.rows[0].supplier_id
          ? {
              id: inventory.rows[0].supplier_id,
              name: inventory.rows[0].supplier_name,
              email: inventory.rows[0].supplier_email,
              phone: inventory.rows[0].supplier_phone,
              image: inventory.rows[0].supplier_image,
            }
          : null, // If supplier_id is NULL
      },
    });
  } catch (error) {
    return next(new AppError("Error fetching inventory", 500));
  }
};