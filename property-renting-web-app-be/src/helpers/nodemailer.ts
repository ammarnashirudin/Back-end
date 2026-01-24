import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { APP_BASE_URL, GMAIL_APP_PASS, GMAIL_EMAIL } from "../configs/env.configs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_APP_PASS,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const templatePath = path.join(__dirname, "../templates/verify-email.hbs");
  const source = fs.readFileSync(templatePath, "utf-8");
  const compiled = handlebars.compile(source);

  const link = `${APP_BASE_URL}/verify-email?token=${encodeURIComponent(token)}`;

  const html = compiled({ link });

  await transporter.sendMail({
    from: `"No Reply" <${GMAIL_EMAIL}>`,
    to,
    subject: "Verify your email",
    html,
  });
}

export async function sendResetPasswordEmail(to: string, token: string) {
  const templatePath = path.join(__dirname, "../templates/reset-password.hbs");
  const source = fs.readFileSync(templatePath, "utf-8");
  const compiled = handlebars.compile(source);

  const link = `${APP_BASE_URL}/reset-password/confirm?token=${encodeURIComponent(token)}`;

  const html = compiled({ link });

  await transporter.sendMail({
    from: `"No Reply" <${GMAIL_EMAIL}>`,
    to,
    subject: "Reset Password",
    html,
  });
}
