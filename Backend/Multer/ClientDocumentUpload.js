const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ClientDocumentData');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}-${Date.now()}.${parts}`);
  },
});

const uploadClientData = multer({ storage: storage });

module.exports = uploadClientData;



