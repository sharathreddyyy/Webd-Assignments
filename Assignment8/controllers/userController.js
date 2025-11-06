const bcrypt = require('bcrypt');
const Joi = require('joi');
const path = require('path');
const User = require('../models/User');

// Validation schemas
const nameRegex = /^[A-Za-z ]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const createSchema = Joi.object({
  fullName: Joi.string().trim().pattern(nameRegex).required()
    .messages({ 'string.pattern.base': 'Full name must contain only alphabetic characters and spaces.' }),
  email: Joi.string().trim().email().required(),
  password: Joi.string().pattern(passwordRegex).required()
    .messages({ 'string.pattern.base': 'Password must be at least 8 chars and include uppercase, lowercase, number, and special character.' })
});

const editSchema = Joi.object({
  email: Joi.string().trim().email().required(), // to identify user; cannot change
  fullName: Joi.string().trim().pattern(nameRegex)
    .messages({ 'string.pattern.base': 'Full name must contain only alphabetic characters and spaces.' }),
  password: Joi.string().pattern(passwordRegex)
    .messages({ 'string.pattern.base': 'Password must be at least 8 chars and include uppercase, lowercase, number, and special character.' })
}).or('fullName', 'password');

const deleteSchema = Joi.object({
  email: Joi.string().trim().email().required()
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required()
});

// POST /user/create
exports.createUser = async (req, res) => {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Validation failed.', details: error.details.map(d => d.message) });

    const { fullName, email, password } = value;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Validation failed.', details: ['Email already registered.'] });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hashed });
    return res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};

// PUT /user/edit
exports.editUser = async (req, res) => {
  try {
    const { error, value } = editSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Validation failed.', details: error.details.map(d => d.message) });

    const { email, fullName, password } = value;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (fullName) user.fullName = fullName;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};

// DELETE /user/delete
exports.deleteUser = async (req, res) => {
  try {
    const { error, value } = deleteSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Validation failed.', details: error.details.map(d => d.message) });

    const result = await User.findOneAndDelete({ email: value.email });
    if (!result) return res.status(404).json({ error: 'User not found.' });
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};

// GET /user/getAll
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { fullName: 1, email: 1, password: 1, _id: 0 });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};

// POST /user/uploadImage
exports.uploadImage = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ error: 'Validation failed.', details: ['Email is required.'] });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (user.imagePath) return res.status(400).json({ error: 'Image already exists for this user.' });

    if (!req.file) return res.status(400).json({ error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.' });

    const relPath = path.posix.join('/images', path.basename(req.file.path));
    user.imagePath = relPath;
    await user.save();

    return res.status(201).json({ message: 'Image uploaded successfully.', filePath: relPath });
  } catch (err) {
    // multer fileFilter errors land here as Error
    if (err.message && err.message.startsWith('Invalid file format')) {
      return res.status(400).json({ error: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.' });
    }
    return res.status(500).json({ error: 'Server error.' });
  }
};

// POST /user/login (authentication)
exports.login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Validation failed.', details: error.details.map(d => d.message) });

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials.' });

    return res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};
