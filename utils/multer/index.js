const multer = require("multer");
const util = require("util");
const path = require(`path`);



const location = path.join(__dirname, "../../", `uploads`);

// console.log({ location });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, location);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
// UPLOAD SINGLE FILE
const uploadFile = multer({
  storage: storage,
}).single("file");

// UPLAOD MULTIPLE FILES
const uploadMultipleFiles = multer({
  storage: storage,
}).any();

module.exports.uploadMultiple = util.promisify(uploadMultipleFiles);
