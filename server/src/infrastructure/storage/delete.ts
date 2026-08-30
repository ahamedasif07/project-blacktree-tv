import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.config";
import config from "../../config";

export const deleteFile = async (key: string) => {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: config.r2.bucketName!,
      Key: key,
    })
  );
};