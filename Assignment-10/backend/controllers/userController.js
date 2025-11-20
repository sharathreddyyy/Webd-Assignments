const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const nameRegex = /^[A-Za-z ]+$/;

const createSchema = Joi.object({
  fullName: Joi.string().trim().pattern(nameRegex).required(),
  email:    Joi.string().trim().email().required(),
  password: Joi.string().min(8).required(),
  type:     Joi.string().valid('admin', 'employee').required()
});

const loginSchema = Joi.object({
  email:    Joi.string().trim().email().required(),
  password: Joi.string().required()
});

// POST /user/create
exports.createUser = async (req, res) => {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const { fullName, email, password, type } = value;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['Email already registered']
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashed,
      type
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        type: user.type
      }
    });
  } catch (err) {
    console.error('Create user error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    return res.status(200).json({ users });
  } catch (err) {
    console.error('Get users error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// POST /user/login
exports.login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
      id: user._id,
      email: user.email,
      type: user.type,
      fullName: user.fullName
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: payload
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};