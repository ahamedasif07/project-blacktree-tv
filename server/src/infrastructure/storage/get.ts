import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.config";
import config from "../../config";

export const getFile = async (key: string) => {
  const response = await r2.send(
    new GetObjectCommand({
      Bucket: config.r2.bucketName!,
      Key: key,
    })
  );
  return response.Body;
};