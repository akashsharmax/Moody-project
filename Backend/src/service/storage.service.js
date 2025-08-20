import ImageKit from "imagekit";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadfile(file){
    return new Promise((resolve, reject) => {
        imagekit.upload(
        {
            file: file.buffer,
            fileName: new mongoose.Types.ObjectId().toString(),
            folder: "mood-player-songs"
        },
        (error, result) => {
            if (error) {
            console.error("ImageKit upload error:", error);
            reject(error);
            } else {
            resolve(result);
            }
        }
        );
    });
}

export default uploadfile;