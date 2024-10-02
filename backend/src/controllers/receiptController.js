const Receipt = require('../models/ReceiptTemplate');

// Create a new receipt
exports.addReceipt = async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    const savedReceipt = await receipt.save();
    return res.status(201).json(savedReceipt);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create receipt' });
  }
};

// Get all receipts
exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    return res.status(200).json(receipts);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch receipts' });
  }
};

// Get a single receipt by ID
exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ error: 'Receipt not found' });
    return res.status(200).json(receipt);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch receipt' });
  }
};

// Update receipt by ID
exports.updateReceipt = async (req, res) => {
  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReceipt)
      return res.status(404).json({ error: 'Receipt not found' });
    return res.status(200).json(updatedReceipt);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update receipt' });
  }
};

// Delete receipt by ID
exports.deleteReceipt = async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!deletedReceipt)
      return res.status(404).json({ error: 'Receipt not found' });

    // Include the deleted receipt's ID in the response
    return res.status(200).json({
      message: 'Receipt deleted successfully',
      deletedReceiptId: deletedReceipt._id,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete receipt' });
  }
};