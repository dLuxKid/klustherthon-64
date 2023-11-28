import schedule from "node-schedule";
// import { sendMail } from "./EmailService.js";
const sendMail = require("./emailService");

export const scheduleInvoice = (
  date,
  emailAddresses,
  businessName,
  amount,
  dueDate,
  title,
  clientName
) => {
  const job = schedule.scheduleJob(date, () => {
    sendMail(
      emailAddresses,
      businessName,
      amount,
      dueDate,
      title,
      clientName
    ).catch(console.error);
  });
};
