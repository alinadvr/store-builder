import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export default async function sendEmail(emailPayload: EmailPayload) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
  });

  await transporter.verify((error) => {
    if (error) console.error("[TRANSPORTER ERROR]: ", error);
    else console.info("Server is ready to send messages");
  });

  return await transporter.sendMail({
    from: "SHOPS.com Team <shops.com.info@gmail.com>",
    ...emailPayload,
  });
}
