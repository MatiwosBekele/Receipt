const Product = require('../models/Product');

exports.calculatePayment = async (req, res) => {
  try {
    const { code, quantity } = req.body;
    const product = await Product.findOne({ code });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const total = product.price * quantity;
    const totalWithVat = total * 1.15;  // Adding 15% VAT
    res.status(200).json({ total: totalWithVat });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
