const router = require('express').Router();
const aws = require('aws-sdk');
const db = require('../models');

const { S3BUCKET, S3REGION } = process.env;
aws.config.region = S3REGION;

router.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const { fileName, fileType } = req.query;

    s3.getSignedUrl('putObject', {
        Bucket: S3BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json(err)
        }
        res.json({
            signedRequest: data,
            url: `https://${S3BUCKET}.s3.amazonaws.com/${fileName}`
        });
    });
});

router.delete('/delete', (req, res) => {
    const s3 = new aws.S3();
    const { fileName, imageId } = req.query;
    const params = {
        Bucket: S3BUCKET,
        Key: fileName
    }
    console.log(imageId)
    s3.headObject(params, (err, data) => {
        if (err) res.status(500).json(err);
        s3.deleteObject(params, (err, data) => {
            if (err) res.status(500).json(err);
            else {
                if (imageId !== "NEW_IMAGE") {
                    db.Images
                        .destroy({
                            where: {
                                id: imageId
                            }
                        }).then((resp) => {
                            res.json("SUCCESS!");
                        }).catch((error) => {
                            res.json(error)
                        });
                } else {
                    res.json("SUCCESS")
                }
            }
        });
    });
});

module.exports = router;