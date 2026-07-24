import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split('.')[0] + '-' + uniqueSuffix;

    return {
      folder: 'facio_dental_reports',
      public_id: filename,
      // If the file is a PDF, we need to explicitly tell Cloudinary it's raw/pdf, 
      // otherwise it tries to process it as an image. Cloudinary handles auto resource_type 
      // decently well but setting it to 'auto' is the safest approach.
      resource_type: 'auto', 
    };
  },
});

export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});
