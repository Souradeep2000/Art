import aws from "aws-sdk";
import dotenv from "dotenv";
import crypto from "crypto";
import { promisify } from "util";

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = "ap-south-1";
const bucketName = "art-aficionado-direct-image";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 20,
  };

  //console.log("key :", imageName);
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

export async function deleteUrl(img) {
  const imageName = img.split("aws.com/")[1];
  //console.log(imageName);
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err);
  });
}
