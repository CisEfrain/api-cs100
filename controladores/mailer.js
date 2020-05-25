"use strict";
const nodemailer = require("nodemailer");
var c = require("../config/config");
// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = function (req, res) {
    //res.json(c.mailu.u)
    let subject = "Nueva Solicitud de cambio de contraseña"
    let html = "";// html body
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let user_type = '';
    let { email, username, type } = req.body
    if (type == "watcher") {
        user_type = "Vigilante"
    } else {
        user_type = "Residente"
    }
    html = `
        <h1> Se ha solicitado un cambio de contraseña para el siguiente usuario </h1>
        <h3> tipo de usuario: </h3> ${user_type || "No recibido"} <br/>
        <h3> identificador: </h3> ${email || username} <br/>
        `
    console.log(email + " " + username)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",// true for 465, false for other ports
        auth: {
            user: c.mailu.u, // generated ethereal user
            pass: c.mailu.p, // generated ethereal password
        },
    });
    // send mail with defined transport object
    transporter.sendMail({
        from: '"Cs100 Biometria 👻" <foo@example.com>', // sender address
        to: c.mailu.u, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    }).then(r => {
        console.log
    }).catch(e => {
        res.send(e)
        return
    })
    //console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send("listo")
    return
}

