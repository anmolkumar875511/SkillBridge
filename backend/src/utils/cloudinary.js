import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'skillbridge_avatars' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error:', error);
                        return reject(null);
                    }
                    resolve({
                        url: result.secure_url,
                        id: result.public_id,
                    });
                }
            );
            uploadStream.end(fileBuffer);
        });
    } catch (error) {
        console.error('Unexpected error during Cloudinary upload:', error.message);
        return null;
    }
};