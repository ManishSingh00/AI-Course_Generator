// pages/api/upload-image.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // support large files
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fileBase64 } = req.body;

  if (!fileBase64) {
    return res.status(400).json({ error: 'Missing file' });
  }

  try {
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: 'ai-course',
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
