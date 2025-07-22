var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_public_key,
    privateKey : process.env.IMAGEKIT_private_key,
    urlEndpoint : process.env.IMAGEKIT_url_endpoint
});

function uploadFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload(
            {
                file: file.buffer, 
                fileName: file.originalname,
            },
            function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

module.exports = { uploadFile }; 
