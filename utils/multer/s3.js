// load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const s3 = require(`./../s3/index`);
const multer = require("multer");
const multerS3 = require("multer-s3");
const util = require("util");
const path = require("path");
const slugify = require("slugify");

// Set the region
AWS.config.update({ region: process.env.AWS_S3_BUCKET_REGION });

//
let s3Storage = multerS3({
  s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, path.basename(Date.now() + slugify(file.originalname)));
  },
});
let uploadMultipleFiles = multer({
  storage: s3Storage,
}).any();

module.exports.uploadMultipleS3 = util.promisify(uploadMultipleFiles);
