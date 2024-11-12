// load the AWS SDK for Node.js
// const AWS = require("aws-sdk");
const s3 = require(`./../s3/index`);
const multer = require("multer");
const multerS3 = require("multer-s3");
const util = require("util");
const path = require("path");
const slugify = require("slugify");


const bucket = process.env.MINIO_BUCKET;


const storage = multerS3({
  s3: s3,
  bucket: bucket,
  acl: "public-read",
  key: (req, file, cb) => {
    cb(null, `${Date.now()}-${slugify(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
});

module.exports.uploadFile = util.promisify(upload.single("file"));
module.exports.uploadMultipleFiles = util.promisify(upload.any());


