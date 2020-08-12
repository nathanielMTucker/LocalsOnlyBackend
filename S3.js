require('dotenv').config({path:__dirname + '/.env'});
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const generate = l =>(
  crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase()
)
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();

export const upload = file =>{

  const content = fs.readFileSync(file)
  
  //configuring parameters
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Body : content,
    Key : "folder/"+Date.now()+"_"+path.basename(filePath)
  };

  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);
    }
  });
}