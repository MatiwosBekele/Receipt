#!/bin/bash

# 1. Initialize Node.js project
echo "Initializing Node.js project..."
npm init -y

# 2. Install necessary packages
echo "Installing necessary packages..."
npm install express mongoose bcrypt jsonwebtoken dotenv body-parser

# 3. Create folder structure
echo "Setting up folder structure..."
mkdir -p src/{models,routes,controllers,config}

# 4. Create main server file
echo "Creating server.js..."
cat <<EOL > src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { authenticate } = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', authenticate, productRoutes);
app.use('/api/payment', authenticate, paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# 5. Create Mongoose Models

# User Model
echo "Creating User model..."
cat <<EOL > src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  tinNumber: { type: String, required: true },
  shopName: { type: String, required: true },
  shopAddress: {
    subCity: String,
    woreda: String,
    streetName: String,
    houseNumber: String
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
EOL

# Product Model
echo "Creating Product model..."
cat <<EOL > src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  stock: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
EOL

# 6. Create Controllers

# User Controller
echo "Creating User controller..."
cat <<EOL > src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password, firstName, middleName, lastName, tinNumber, shopName, shopAddress } = req.body;
    const user = new User({ username, password, firstName, middleName, lastName, tinNumber, shopName, shopAddress });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
EOL

# Product Controller
echo "Creating Product controller..."
cat <<EOL > src/controllers/productController.js
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { code, name, price, description, stock } = req.body;
    const product = new Product({ code, name, price, description, stock });
    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
EOL

# Payment Controller
echo "Creating Payment controller..."
cat <<EOL > src/controllers/paymentController.js
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
EOL

# 7. Create Routes

# User Routes
echo "Creating User routes..."
cat <<EOL > src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
EOL

# Product Routes
echo "Creating Product routes..."
cat <<EOL > src/routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
EOL

# Payment Routes
echo "Creating Payment routes..."
cat <<EOL > src/routes/paymentRoutes.js
const express = require('express');
const { calculatePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', calculatePayment);

module.exports = router;
EOL

# 8. Create Authentication Middleware
echo "Creating Authentication middleware..."
cat <<EOL > src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
EOL

# 9. Environment Variables
echo "Setting up environment variables..."
cat <<EOL > .env
MONGO_URI=mongodb://localhost:27017/auto_shop
JWT_SECRET=your_jwt_secret
PORT=5000
EOL

echo "Project setup complete. You can start the server with 'node src/server.js'."
