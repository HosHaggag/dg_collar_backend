const s3 = require("./index.js");
const slugify = require("./../slugify.js");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { videoMimeTypes, imageMimeTypes } = require("./mediaMimeTypes.js");
// Function to convert a string into a slug

module.exports.uploadFileToS3 = async (file) => {
  const slugifiedFilename = `${Date.now()}-${slugify(file.originalname)}`;

  let params;

  if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
    let buffer = Buffer.from(file.buffer);

    params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: slugifiedFilename,
      Buffer:buffer,
      Body: buffer,
      ContentType: file.mimetype,
    };
  } else {
    throw new Error(`Unsupported file type: ${mimetype}`);
  }

  // Upload the file to S3
  console.log({ params });
  let command = new PutObjectCommand(params);
  // console.log(
  //   { s3 },
  //   `

  // `,
  //   `  **`,
  //   command,
  //   s3.upload
  // );
  // s3.upload(command);
  await s3.send(command);
  return slugifiedFilename;
};

module.exports.deleteFileFromS3 = async (key) => {
  try {
    let params;
    const mimetype = key.split(".").pop();
    // console.log({ mimetype });
    if (imageMimeTypes.includes(mimetype) || videoMimeTypes.includes(mimetype)) {
      console.log(`image ==>`);

      params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      };
    } else {
      throw new Error(`Unsupported file type: ${mimetype}`);
    }

    let command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (err) {
    console.log(err);
    throw new Error(`Error while deleting old  avatar`);
  }
};
