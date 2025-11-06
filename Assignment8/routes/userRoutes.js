const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createUser, editUser, deleteUser, getAllUsers, uploadImage, login
} = require('../controllers/userController');

router.post('/user/create', createUser);
router.put('/user/edit', editUser);
router.delete('/user/delete', deleteUser);
router.get('/user/getAll', getAllUsers);
router.post('/user/uploadImage', upload.single('image'), uploadImage);

// Bonus auth per assignment requirement
router.post('/user/login', login);

module.exports = router;
