import express from 'express';

import { createInventory, getAllInventory, updateInventory } from '../controllers/inventoryController';

const router = express.Router();

router
    .route('/')
        .get(getAllInventory)
        .post(createInventory)

router.route("/:id").patch(updateInventory)
export default router;