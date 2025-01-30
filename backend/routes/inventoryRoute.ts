import express from 'express';

import { createInventory, deleteInventory, getAllInventory, getSingleInventory, updateInventory } from '../controllers/inventoryController';
import { protect } from '../controllers/authController';

const router = express.Router();

router
    .route('/')
        .get(protect,getAllInventory)
        .post(protect,createInventory)

router
    .route("/:id")
        .patch(protect,updateInventory)
        .delete(protect,deleteInventory)
        .get(protect,getSingleInventory)
export default router;