import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "insourcextech",
    resource_type: "image",  // Changed from "raw" to "image"
    public_id: `${Date.now()}-${file.originalname}`,
    transformation: [
      { width: 1000, height: 1000, crop: "limit" }  // Added basic crop/resize
    ]
  }),
});

const upload = multer({ storage });

export default upload;