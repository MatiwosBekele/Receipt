#!/bin/bash

# Step 1: Initialize a new Node.js project
echo "Initializing Node.js project..."
npm init -y

# Step 2: Install the required dependencies
echo "Installing dependencies..."
npm install express mongoose bcryptjs jsonwebtoken body-parser dotenv

# Step 3: Install development dependencies
echo "Installing dev dependencies..."
npm install --save-dev nodemon

# Step 4: Set up the folder structure
echo "Setting up project structure..."
mkdir -p models controllers routes middlewares config
touch server.js .env

# Step 5: Set up environment variables in the .env file
echo "Setting up environment variables..."
cat <<EOT >> .env
PORT=3000
MONGO_URI=mongodb://localhost:27017/auto_spare_parts
JWT_SECRET=your_jwt_secret
EOT

# Step 6: Create the basic server setup in server.js
echo "Setting up the server.js file..."
cat <<EOT >> server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payment', require('./routes/payment'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port', port);
});
EOT

# Step 7: Create a basic product model in models/Product.js
echo "Setting up the Product model..."
cat <<EOT >> models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
EOT

# Step 8: Create a basic user model in models/User.js
echo "Setting up the User model..."
cat <<EOT >> models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    tinNumber: { type: String, required: true },
    shopName: { type: String, required: true },
    shopAddress: {
        subCity: { type: String, required: true },
        woreda: { type: String, required: true },
        streetName: { type: String },
        houseNumber: { type: String }
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Hash password before saving user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
EOT

# Step 9: Set up authentication middleware in middlewares/auth.js
echo "Setting up the authentication middleware..."
cat <<EOT >> middlewares/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;
EOT

# Step 10: Set up routes for products (CRUD operations) in routes/products.js
echo "Setting up the product routes..."
cat <<EOT >> routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    const { code, name, price, description, stock } = req.body;
    const product = new Product({ code, name, price, description, stock });
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
EOT

# Step 11: Set up routes for user authentication and profile management in routes/users.js
echo "Setting up the user routes..."
cat <<EOT >> routes/users.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, tinNumber, shopName, shopAddress, username, password } = req.body;
    const user = new User({ firstName, middleName, lastName, tinNumber, shopName, shopAddress, username, password });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Authenticate user and get token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;
EOT

# Step 12: Set up the payment route in routes/payment.js
echo "Setting up the payment route..."
cat <<EOT >> routes/payment.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Calculate payment with VAT
router.post('/', async (req, res) => {
    const { code, amount } = req.body;
    try {
        const product = await Product.findOne({ code });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const totalPrice = product.price * amount;
        const totalPriceWithVAT = totalPrice + (totalPrice * 0.15);
        res.json({ totalPrice: totalPriceWithVAT });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
EOT

echo "Project setup complete!"
