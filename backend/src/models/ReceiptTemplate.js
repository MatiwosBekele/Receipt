const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema(
  {
    preparedBy: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    buyersTIN: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    fsno: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Receipt', receiptSchema);