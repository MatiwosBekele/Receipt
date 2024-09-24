const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const { authMiddleware } = require('./src/middlewares/authMiddleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/profile', authMiddleware, profileRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/payment', authMiddleware, paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
