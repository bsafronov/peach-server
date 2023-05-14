import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

class FileService {
  async uploadImage(
    file: Express.Multer.File,
    folder?: string
  ): Promise<UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          transformation: { width: 300 },
          folder: folder || "unsorted",
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message));
          } else {
            resolve(result);
          }
        }
      );

      const fileStream = Readable.from(file.buffer);
      fileStream.pipe(uploadStream);
    });
  }
}

export const fileService = new FileService();
