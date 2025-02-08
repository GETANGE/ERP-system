import express from 'express';

import { createInventMovement, deleteMovement, getAllMovements, getInventoryMovementById, updateInventoryMovement } from '../controllers/inventory-movement';
import { protect } from '../controllers/authController';

const router = express.Router();

router
    .route('/')
        .get(getAllMovements)
        .post(protect ,createInventMovement)

router
    .route('/:id')
        .get(protect, getInventoryMovementById)
        .patch(protect, updateInventoryMovement)
        .delete(protect, deleteMovement)

export default router;