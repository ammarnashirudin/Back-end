import nodemailer from "nodemailer";
import { GMAIL_EMAIL, GMAIL_APP_PASS } from "../configs/env.configs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_APP_PASS,
  },
});

import fs from "fs";
import path from "path";
import handlebars from "handlebars";


export const sendVerificationEmail = async (
  to: string,
  token: string
) => {
  const templatePath = path.join(
    __dirname,
    "../templates/verify-email.hbs"
  );

  const source = fs.readFileSync(templatePath, "utf-8");
  const compiled = handlebars.compile(source);

  const html = compiled({
    link: `http://localhost:3000/verify-email?token=${token}`,
  });

  await transporter.sendMail({
    from: "No Reply <noreply@app.com>",
    to,
    subject: "Verify your email",
    html,
  });
};
