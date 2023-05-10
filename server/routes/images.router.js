const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Create an instance of the AWS.S3 class with your AWS credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// Configure multer to use multer-s3 for storing the uploaded file in the S3 bucket
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'aws-spike',
    acl: 'public-read', // Optional: Set the ACL permissions for the uploaded file
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // Optional: Set the desired key (path) for the uploaded file
    },
  }),
});

// Update the POST route to use the multer upload middleware
router.post('/', upload.single('image'), (req, res) => {
  // Retrieve the key (path) of the uploaded file from the request object
  const fileKey = req.file.key;
  const description = req.body.description;

  // Construct the URL of the uploaded file using the S3 bucket URL and the file key
  const imageUrl = `https://aws-spike.s3.amazonaws.com/${fileKey}`;
  console.log("new image url:", imageUrl)
  // Save the image URL and other data to a database or perform any required operations

  res.send(imageUrl);
});


// router.get('/:imageName', (req, res) => {
//   console.log("hello from get request");
//   const imageName = req.params.imageName;
//   const readStream = fs.createReadStream(`server/uploads/${imageName}`);
//   readStream.pipe(res);
// });

module.exports = router;