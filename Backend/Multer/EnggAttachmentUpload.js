const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/EnggAttachments');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`);
  },
});

const uploaded = multer({ storage: storage });


const storageEdit = multer.diskStorage({
  destination:(req,res,cb) => {
    cb(null, './public/EnggAttachments');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`);
  },
})

const uploadEdit = multer({ storage: storageEdit });





module.exports = {uploaded, uploadEdit};



