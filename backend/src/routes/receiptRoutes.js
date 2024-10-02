const express = require('express');
const receiptController = require('../controllers/receiptController');

const router = express.Router();

// POST: Create a new receipt
router.post('/', receiptController.addReceipt);

// GET: Get all receipts
router.get('/', receiptController.getAllReceipts);

// GET: Get a receipt by ID
router.get('/:id', receiptController.getReceiptById);

// PUT: Update a receipt by ID
router.put('/:id', receiptController.updateReceipt);

// DELETE: Delete a receipt by ID
router.delete('/:id', receiptController.deleteReceipt);

module.exports = router;