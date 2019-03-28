const router = require("express").Router();
const nodemailer = require("nodemailer");
const axios = require('axios');

router.post("/", (req, res) => {
    //todo: validate email/phone number
    const contactMsg = "Name: " + req.body.name + "\n" +
                       "Email: " + req.body.email + "\n" +
                       "Phone Number: " + req.body.phoneNum + "\n" +
                       "Message: " + req.body.message 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.emailUN,
            pass: process.env.emailPW
        }
    });
    const mailOptions = {
        from: process.env.emailUN,
        to: process.env.contactNum,
        subject: "",
        text: contactMsg
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({error: error, message: "Something went wrong while trying to contact this site's owner."});
        } else {
            console.log(info);
            res.json({message: "Success! This site's owner has been sent a message and he will get back to you soon as possible."})
        }
    })
})

router.post("/verifyCaptcha", (req, res) => {
    axios
        .post("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.captchaSecret + "&response=" + req.body.token)
        .then((response) => {
            res.json(response.data);
        }).catch((error) => {
            console.log(error);
            res.json({
                message: "Error while trying to verify user captcha token",
                error: error.message
            })
        })
})

module.exports = router;