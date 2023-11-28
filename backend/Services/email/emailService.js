import nodemailer from "nodemailer";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";

dotenv.config();

// Use the 'await' keyword inside an async function
export const sendMail = expressAsyncHandler(async (  emailAddresses,
  businessName,
  paymentAmount,
  dueDate,
  title,
  userName)=>{
    try {
      var smtpConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSKEY,
        },
      };
  
      var transporter = nodemailer.createTransport(smtpConfig);
  
      // send mail with defined transport object
    
    const info = await transporter.sendMail({
        from: `"${businessName}" <${process.env.EMAIL}>`, // use the configured email address as the sender
        to: emailAddresses, // list of receivers
        subject: "Invoice for " + title, // Subject line
        text: `Hello ${userName},\nYour payment for ${title} of ${paymentAmount} is due on ${dueDate}`, // plain text body
        html: `<b>Hello ${userName},<br>Your payment for ${title} of ${paymentAmount} is due on ${dueDate}</b>`, // html body
      });
  
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });



// Example usage:
// sendMail(
//   "damilolaadeeso@gmail.com, baz@example.com",
//   "Hair Lock Factory",
//   5000,
//   "23-12-2023",
//   "Hairlocks",
//   "Geremy"
// );
