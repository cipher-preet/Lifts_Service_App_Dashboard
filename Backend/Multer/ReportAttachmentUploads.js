const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ReportAttachments');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `ReportImage-${Date.now()}.${parts}`);
  },
});

const uploadReportAttachment = multer({ storage: storage });



//=---------------------------------------------------------------- --------------------------------                            

const PDFStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ReportPdf');
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${parts}`);
  },
});

const reportPdf = multer({ storage: PDFStore });









//=---------------------------------------------------------------- --------------------------------                            


module.exports = {uploadReportAttachment, reportPdf} ;
