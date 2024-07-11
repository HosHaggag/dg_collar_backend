console.log(`Starting imports...`);

const express = require("express");
var cors = require("cors");
var path = require("path");
require("dotenv").config();
const db = require("./database/config");
const mainApiRoute = require("./routes/index");
const { notFound, errorHandler } = require("./utils/errorHandler");
require(`colors`);
//
// const multerS3Config = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_S3_BUCKET_NAME,
//   contentType: multerS3.AUTO_CONTENT_TYPE, // Auto detect the content type
//   acl: "public-read", // Make uploaded files publicly accessible
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     // Set a unique key for each uploaded file
//     cb(null, Date.now().toString() + "-" + file.originalname);
//   },
// });
// module.exports.uploadCustomS3 = multer({
//   storage: multerS3Config,
// });

//
console.log(`Starting routes...`.yellow);

const app = express();
const { PORT = 4000 } = process.env;

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next();
// });

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(`/uploads`, express.static(path.join(__dirname, "uploads")));

app.use("/api", mainApiRoute);
// app.use(express.static(path.join(__dirname, "front-build")));
// app.get(`*`, (req, res) => {
//   res.sendFile(path.join(__dirname, "front-build", "index.html"));
// });
// });
app.use(notFound);
app.use(errorHandler);
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.white.bgGreen);
  });
}).catch((err) => {
  console.log(err);
});
