import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const emailWrapper = (content) => `
<div style="background:#f8fafc;padding:32px;font-family:Inter,Arial,sans-serif">
  <div style="
    max-width:520px;
    margin:auto;
    background:#ffffff;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,0.08)
  ">

    <!-- HEADER -->
    <div style="
      padding:24px;
      text-align:center;
      background:linear-gradient(90deg,#1e3a8a,#f97316);
      color:white;
      font-size:22px;
      font-weight:800;
      letter-spacing:1px;
    ">
      SkillBridge
    </div>

    <!-- BODY -->
    <div style="padding:32px;color:#0f172a">
      ${content}
    </div>

    <!-- FOOTER -->
    <div style="
      padding:16px;
      text-align:center;
      font-size:12px;
      color:#64748b;
      background:#f8fafc
    ">
      © ${new Date().getFullYear()} SkillBridge — Bridging Skills to Success
    </div>

  </div>
</div>
`;

/* ================= OTP EMAIL ================= */

export const sendOTPEmail = async (to, otp) => {
    await transporter.sendMail({
        from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verify your SkillBridge email',
        html: emailWrapper(`
            <h2 style="color:#1e3a8a;margin-bottom:12px">
              Email Verification
            </h2>

            <p style="font-size:15px;line-height:1.6">
              Welcome to <strong>SkillBridge</strong>
              Use the OTP below to verify your email address.
            </p>

            <div style="
              margin:28px 0;
              text-align:center;
              padding:18px;
              background:linear-gradient(90deg,#1e3a8a,#f97316);
              border-radius:12px;
              color:#ffffff;
              font-size:30px;
              letter-spacing:6px;
              font-weight:800;
            ">
              ${otp}
            </div>

            <p style="font-size:14px;color:#475569">
              ⏱ OTP is valid for <strong>10 minutes</strong>.<br/>
              If you didn’t request this, you can safely ignore this email.
            </p>
        `),
    });
};

/* ================= WELCOME EMAIL ================= */

export const sendWelcomeEmail = async (to, name) => {
    await transporter.sendMail({
        from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Welcome to SkillBridge',
        html: emailWrapper(`
            <h2 style="color:#1e3a8a;margin-bottom:12px">
              Welcome, ${name}!
            </h2>

            <p style="font-size:15px;line-height:1.6">
              Your email has been successfully verified 
              You’re now officially part of <strong>SkillBridge</strong>.
            </p>

            <div style="text-align:center;margin:32px 0">
              <a href="${process.env.FRONTEND_URL}"
                style="
                  background:linear-gradient(90deg,#1e3a8a,#f97316);
                  color:#ffffff;
                  padding:14px 32px;
                  border-radius:999px;
                  text-decoration:none;
                  font-weight:700;
                  display:inline-block;
                ">
                Go to Dashboard
              </a>
            </div>

            <p style="font-size:14px;color:#475569">
              Start exploring opportunities, building skills,  
              and bridging the gap between learning and success
            </p>
        `),
    });
};

export const sendPasswordResetEmail = async (to, resetLink) => {
    await transporter.sendMail({
        from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Reset your SkillBridge password',
        html: emailWrapper(`
            <h2 style="color:#1e3a8a;margin-bottom:12px">
              Password Reset
            </h2>

            <p style="font-size:15px;line-height:1.6">
              We received a request to reset your SkillBridge password.
            </p>

            <div style="text-align:center;margin:32px 0">
              <a href="${resetLink}"
                style="
                  background:linear-gradient(90deg,#1e3a8a,#f97316);
                  color:#ffffff;
                  padding:14px 32px;
                  border-radius:999px;
                  text-decoration:none;
                  font-weight:700;
                  display:inline-block;
                ">
                Reset Password
              </a>
            </div>

            <p style="font-size:14px;color:#475569">
              If you didn’t request this, you can safely ignore this email.
            </p>
        `),
    });
};
