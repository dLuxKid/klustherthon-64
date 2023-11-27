import nodemailer from "nodemailer";

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(emailAddresses,businessName,paymentAmount,dueDate,title,userName) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"${businessName}" <foo@example.com>`, // sender address
        to: emailAddresses, // list of receivers
        subject: "Invoice for " + title, // Subject line
        text: `Hello ${userName}`, // plain text body
        html: `<b>Hello ${userName}, \nYour Payment for ${title} of ${paymentAmount}is due on ${dueDate}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}

// sendMail("damilolaadeeso@gmail.com, baz@example.com","Hair lock Factory",
//     5000,23-12-2023,"Hairlocks","Geremy"
// ).catch(console.error);