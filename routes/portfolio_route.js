const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")


router.post("/contact", (req, res)=>{
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kenneth.itodo.fb@gmail.com',
            pass: 'efygpjqvwglvnttx'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: "onoja.jsdev@gmail.com",
        subject: req.body.subject, 
        html: `<p><b>Sender:</b> ${req.body.name}</p>
                <p><b>email:</b> ${req.body.email}</p>
                 <b>Message:</b> <p> ${req.body.message}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(false)
        } else {
            console.log('Email sent: ' + info.response);
            res.send({success:true, message:req.body})
        }
    });
 
})


module.exports = router