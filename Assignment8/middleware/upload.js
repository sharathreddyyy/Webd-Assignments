const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

function fileFilter (req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'));
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
module.exports = upload;
