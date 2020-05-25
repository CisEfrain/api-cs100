"use strict";
const nodemailer = require("nodemailer");
var c = require("../config/config");
// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = function (req, res) {
    //res.json(c.mailu.u)

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let receiver = req.body
    console.log(receiver)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",// true for 465, false for other ports
        auth: {
            user: c.mailu.u, // generated ethereal user
            pass: c.mailu.p, // generated ethereal password
        },
    });
    /* 
        // send mail with defined transport object
        let info =   transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "michelnovellino.programador@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }).then(r => {
            console.log
        }).catch(e => {
            res.send(e)
            return
        })
     */
    //console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send("listo")
    return
}

