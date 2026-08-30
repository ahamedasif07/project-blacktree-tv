import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.config";
import config from "../../config";

export const uploadFile = async (
  key: string,
  file: Buffer,
  contentType: string
) => {
  await r2.send(
    new PutObjectCommand({
      Bucket: config.r2.bucketName!,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  return `${config.r2.publicUrl}/${key}`;
};