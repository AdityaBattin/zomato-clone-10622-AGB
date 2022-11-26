import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';

import { ImageModel } from '../../database/allModules'
// import { IdValidation } from '../../validation/common.validation'
import { s3Upload } from '../../utils/s3'

const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Route     /:_id
 * Des       Get image details
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get('/:_id', async (req, res) => {
    try {
        // const { _id } = req.params;
        // await IdValidation(req.params);
        const image = await ImageModel.findById(req.params._id);


        return res.status(200).json({ image });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/**
 * Route     /
 * Des       Upload Image to s3 bucket and save file link to mongoDB
 * Params    _id
 * Access    Public
 * Method    POST
 */
Router.post("/", upload.single("File"), async (req, res) => {
    try {
        const File = req.file;

        const bucketOptions = {
            Bucket: "zomato-web-clone",
            Key: File.originalname,
            Body: File.buffer,
            ContentType: File.mimetype,
            ACL: "public-read", // Access Control List
        };

        const uploadImage = await s3Upload(bucketOptions);

        const dbUpload = await ImageModel.create({
            images: [
                {
                    location: uploadImage.Location,
                },
            ],
        });

        return res.status(200).json({ dbUpload });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Router.post("/", upload.array("file", 2), async (req, res) => {
//   try {
//     const file = req.file;

//     const bucketOptions = {
//       Bucket: "zomato-web-clone",
//       Key: file.originalname,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: "public-read", // Access Control List
//     };

//     const uploadImage = await s3Upload(bucketOptions);

//     const dbUpload = await ImageModel.create({
//       images: [
//         {
//           location: uploadImage.Location,
//         },
//       ],
//     });

//     return res.status(200).json({ dbUpload });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

export default Router;