import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "./r2.config";
import config from "../../config";

export const generateUploadUrl = async (
  key: string,
  contentType: string
) => {
  const command = new PutObjectCommand({
    Bucket: config.r2.bucketName!,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(r2, command, {
    expiresIn: 60 * 5,
  });
};