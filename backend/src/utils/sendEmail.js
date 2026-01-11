import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendOTPEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your SkillBridge email",
    attachments: [
      {
        filename: "logo.png",
        path: "./src/assets/logo.png", 
        cid: "skillbridge-logo"
      }
    ],
    html: `
      <div style="background:#f8fafc;padding:30px;font-family:Arial,sans-serif">
        <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08)">
          
          <div style="text-align:center;padding:24px">
            <img src="cid:skillbridge-logo" alt="SkillBridge" style="height:70px" />
          </div>

          <div style="padding:0 32px 32px;color:#0f172a">
            <h2 style="color:#1e3a8a;margin-bottom:8px">
              Email Verification
            </h2>

            <p style="font-size:15px;line-height:1.6">
              Welcome to <strong>SkillBridge</strong>!
              Please use the OTP below to verify your email address.
            </p>

            <div style="
              margin:24px 0;
              text-align:center;
              padding:16px;
              background:linear-gradient(90deg,#1e3a8a,#f97316);
              border-radius:10px;
              color:#ffffff;
              font-size:28px;
              letter-spacing:4px;
              font-weight:bold;
            ">
              ${otp}
            </div>

            <p style="font-size:14px;color:#475569">
              ⏱ This OTP is valid for <strong>10 minutes</strong>.  
              If you did not create an account, you can safely ignore this email.
            </p>

            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb" />

            <p style="font-size:13px;color:#64748b;text-align:center">
              SkillBridge — Bridging Skills to Success
            </p>
          </div>
        </div>
      </div>
    `
  });
};

export const sendWelcomeEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to SkillBridge",
    attachments: [
      {
        filename: "logo.png",
        path: "./src/assets/logo.png",
        cid: "skillbridge-logo"
      }
    ],
    html: `
      <div style="background:#f8fafc;padding:30px;font-family:Arial,sans-serif">
        <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08)">
          
          <div style="text-align:center;padding:24px">
            <img src="cid:skillbridge-logo" alt="SkillBridge" style="height:70px" />
          </div>

          <div style="padding:0 32px 32px;color:#0f172a">
            <h2 style="color:#1e3a8a;margin-bottom:8px">
              Welcome, ${name}!
            </h2>

            <p style="font-size:15px;line-height:1.6">
              Your email has been successfully verified.  
              You are now officially part of <strong>SkillBridge</strong>.
            </p>

            <div style="text-align:center;margin:28px 0">
              <a href="${process.env.FRONTEND_URL}"
                style="
                  background:linear-gradient(90deg,#1e3a8a,#f97316);
                  color:#ffffff;
                  padding:12px 28px;
                  border-radius:999px;
                  text-decoration:none;
                  font-weight:bold;
                  display:inline-block;
                ">
                Visit SkillBridge Portal
              </a>
            </div>

            <p style="font-size:14px;color:#475569">
              Start exploring opportunities, building skills,  
              and bridging the gap between learning and success.
            </p>

            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb" />

            <p style="font-size:13px;color:#64748b;text-align:center">
              © ${new Date().getFullYear()} SkillBridge  
              <br />Empowering Skills • Building Futures
            </p>
          </div>
        </div>
      </div>
    `
  });
};


export const sendPasswordResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
    to,
    subject: "SkillBridge Password Reset",
    html: `
      <div style="background:#f8fafc;padding:30px;font-family:Arial,sans-serif">
        <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08)">
          
          <div style="text-align:center;padding:24px">
            <img src="cid:skillbridge-logo" alt="SkillBridge" style="height:70px" />
          </div>

          <div style="padding:0 32px 32px;color:#0f172a">
            <h2 style="color:#1e3a8a;margin-bottom:8px">
              Password Reset Request
            </h2>

            <p style="font-size:15px;line-height:1.6">
              We received a request to reset your SkillBridge password.  
              Click the button below to proceed.
            </p>

            <div style="text-align:center;margin:28px 0">
              <a href="${resetLink}"
                style="
                  background:linear-gradient(90deg,#1e3a8a,#f97316);
                  color:#ffffff;
                  padding:12px 28px;
                  border-radius:999px;
                  text-decoration:none;
                  font-weight:bold;
                  display:inline-block;
                ">
                Reset Password
              </a>
            </div>

            <p style="font-size:14px;color:#475569">
              If you did not request a password reset, please ignore this email.  
              Your password will remain unchanged.
            </p>

            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb" />

            <p style="font-size:13px;color:#64748b;text-align:center">
              © ${new Date().getFullYear()} SkillBridge  
              <br />Bridging Skills to Success
            </p>
          </div>
        </div>
      </div>
    `
  });
};