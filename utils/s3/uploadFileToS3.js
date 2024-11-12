const s3Client = require("./index.js");
const slugify = require("./../slugify.js");
// const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { videoMimeTypes, imageMimeTypes } = require("./mediaMimeTypes.js");
// Function to convert a string into a slug

const bucket = process.env.MINIO_BUCKET;

module.exports.uploadFileToS3 = async (file) => {

  const slugifiedFilename = `${Date.now()}-${slugify(file.originalname)}`;


  const exists = await s3Client.bucketExists(bucket)
  if (exists) {
    console.log('Bucket ' + bucket + ' exists.')
  } else {
    await minioClient.makeBucket(bucket, 'us-east-1')
    console.log('Bucket ' + bucket + ' created in "us-east-1".')
  }

  var metaData = {
    'Content-Type': 'text/plain',
    'X-Amz-Meta-Testing': 1234,
    example: 5678,
  }

  await s3Client.fPutObject(bucket, slugifiedFilename, file.path, metaData)
  console.log('File uploaded successfully. File name: ' + slugifiedFilename + ' in bucket: ' + bucket) 
  return slugifiedFilename;

};

module.exports.deleteFileFromS3 = async (key) => {
  // Delete the file from minio
  try{
    await s3Client.removeObject( bucket, key)
    console.log('Removed the object: ' + key)
  }
  catch(err){
    console.log(err)
  }
 
};
