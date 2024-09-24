const express = require('express');
const { calculatePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', calculatePayment);

module.exports = router;
