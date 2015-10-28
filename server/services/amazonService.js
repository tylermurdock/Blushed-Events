var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});


var s3bucket = new AWS({params: {Bucket: 'name of bucket you want it to upload to'}});

module.exports.uploadToS3 = function (fileObj, callback){
  var params = {
    Key: fileObj.name,
    Body: fileObj.body,
    ContentType: fileObj.type,
    ACL: 'public-read'
  };
  s3bucket.upload(params, callback);
};
