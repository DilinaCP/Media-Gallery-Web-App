import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const fromAddress = process.env.SMTP_FROM || "Media Gallery <no-reply@mediagallery.local>";

const createTransporter = () => {
  if (!smtpHost) {
    throw new Error("SMTP_HOST is required to send emails");
  }

  const hasAuth = Boolean(smtpUser && smtpPass);

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: hasAuth
      ? {
          user: smtpUser,
          pass: smtpPass,
        }
      : undefined,
  });
};

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    text,
    html,
  });
};

export default sendEmail;
