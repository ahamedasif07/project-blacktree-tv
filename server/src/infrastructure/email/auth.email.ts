import nodemailer from "nodemailer";
import config from "../../config";

const getTransporter = () => {
  const mailConfig: any = {
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
  };
  if (config.email.user && config.email.password) {
    mailConfig.auth = {
      user: config.email.user,
      pass: config.email.password,
    };
  }
  return nodemailer.createTransport(mailConfig);
};

const transporter = getTransporter();

export const sendOTPEmail = async (email: string, otp: string, type: string) => {
  const subjectMap: Record<string, string> = {
    "sign-in": "Your Sign-In OTP",
    "email-verification": "Verify Your Email Address",
    "forget-password": "Reset Your Password",
  };

  const subject = subjectMap[type] || "Verification Code";

  const mailOptions = {
    from: `"Blacktree TV" <${config.email.user || "noreply@blacktree.tv"}>`,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #E50914; text-align: center;">Blacktree TV</h2>
        <p>Hello,</p>
        <p>Your verification code for <strong>${type.replace("-", " ")}</strong> is:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire shortly. If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Blacktree TV. All rights reserved.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email Service] OTP sent to ${email} for ${type}`);
  } catch (error) {
    console.error("[Email Service] Failed to send email:", error);
    throw new Error("Failed to send verification email.");
  }
};
