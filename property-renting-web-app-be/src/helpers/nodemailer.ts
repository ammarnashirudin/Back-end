import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { GMAIL_EMAIL, GMAIL_APP_PASS, APP_BASE_URL } from "../configs/env.configs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_APP_PASS,
  },
});

type SendVerificationEmailParams = {
  to: string;
  token: string;
};

export async function sendVerificationEmail({
  to,
  token,
}: SendVerificationEmailParams) {
  const templatePath = path.join(
    __dirname,
    "../templates/verify-email.hbs"
  );

  const source = fs.readFileSync(templatePath, "utf-8");
  const compiled = handlebars.compile(source);

  const verificationLink = `${APP_BASE_URL}/verify-email?token=${token}`;

  const html = compiled({
    link: verificationLink,
  });

  await transporter.sendMail({
    from: `"No Reply" <${GMAIL_EMAIL}>`,
    to,
    subject: "Verify your email",
    html,
  });
}
