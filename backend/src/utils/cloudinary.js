import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
    try{
        if(!filePath) return null;

        const result = await cloudinary.uploader.upload(filePath,{
            resource_type: "image"
        });

        return {
            url: result.secure_url,
            id: result.public_id
        };
    }
    catch(error){
        console.error("Error uploading avatar to Cloudinary:", error.message);

        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        return null;
    }
};