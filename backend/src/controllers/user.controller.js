import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOTPEmail, sendWelcomeEmail, sendPasswordResetEmail } from "../utils/sendEmail.js";
import { uploadImage } from "../utils/cloudinary.js";
import fs from "fs";
import crypto from "crypto";



export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new apiError(400, "Missing required fields"));
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return next(new apiError(400, "Invalid email format"));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isEmailVerified) {
    return next(new apiError(400, "User with this email already exists"));
  }

  if (existingUser && !existingUser.isEmailVerified) {
    await User.deleteOne({ _id: existingUser._id });
  }

  const otp = generateOTP();
  const user = new User({ name, email, password });
  await user.setEmailOTP(otp);

  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    return next(
      new apiError(
        400,
        "Email address is invalid or cannot receive emails"
      )
    );
  }

  await user.save();

  res.status(201).json(
    new apiResponse(201, "OTP sent to email for verification", {
      email
    })
  );
});



export const verifyEmailOTP = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new apiError(400, "Email and OTP are required"));
  }

  const user = await User.findOne({ email }).select("+emailOTP +emailOTPExpires");

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  if (user.isEmailVerified) {
    return next(new apiError(400, "Email already verified"));
  }

  if (!user.emailOTP || user.emailOTPExpires.getTime() < Date.now()) {
    const currentTime = Date.now();
    console.log("Expired OTP:", user.emailOTPExpires.getTime(), "Current Time:", currentTime);
    return next(new apiError(400, "OTP expired"));
  }

  const isValidOTP = await user.isEmailOTPMatch(otp);
  if (!isValidOTP) {
    return next(new apiError(400, "Invalid OTP"));
  }

  user.isEmailVerified = true;
  user.clearEmailOTP();
  await sendWelcomeEmail(user.email, user.name);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax"
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 1000 * 60 * 15
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    .json(
      new apiResponse(200, "Email verified and login successful", {
        user: user.toJSON(),
        accessToken,
        refreshToken
      })
    );
});



export const resendEmailOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new apiError(400, "Email is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  if (user.isEmailVerified) {
    return next(new apiError(400, "Email already verified"));
  }

  const otp = generateOTP();
  await user.setEmailOTP(otp);

  await user.save({ validateBeforeSave: false });
  await sendOTPEmail(email, otp);

  res.status(200).json(
    new apiResponse(200, "OTP resent successfully")
  );
});



export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError(400, "Missing email or password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordMatch(password))) {
    return next(new apiError(401, "Invalid email or password"));
  }

  if (!user.isEmailVerified) {
    return next(new apiError(403, "Please verify your email before login"));
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax"
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 1000 * 60 * 15
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    .json(
      new apiResponse(200, "Login successful", {
        user: user.toJSON(),
        accessToken,
        refreshToken
      })
    );
});



export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new apiResponse(200, "User profile fetched successfully", {
      user: req.user.toJSON()
    })
  );
});



export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: "" }
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax"
  };

  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);

  res.status(200).json(
    new apiResponse(200, "Logout successful")
  );
});


export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(new apiError(401, "Refresh token missing"));
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return next(new apiError(401, "Refresh token expired"));
  }

  const user = await User.findOne({
    _id: decoded.id,
    refreshToken
  });

  if (!user) {
    return next(new apiError(401, "Invalid refresh token"));
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/" // ⭐ REQUIRED
  };

  res
    .cookie("accessToken", newAccessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .status(200)
    .json({ success: true });
});




export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new apiError(400, "Missing required fields"));
  }

  req.user.name = name;
  await req.user.save();

  res.status(200).json(
    new apiResponse(200, "User profile updated successfully",{
      user: req.user.toJSON()
    })
  );
});



export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new apiError(400, "Missing required fields"));
  }

  if (currentPassword === newPassword) {
    return next(new apiError(400, "New password must be different from current password"));
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.isPasswordMatch(currentPassword))) {
    return next(new apiError(401, "Current password is incorrect"));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json(
    new apiResponse(200, "Password changed successfully")
  );
});



export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new apiError(400, "Email is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new apiError(404, "You are not registered with us"));
  }

  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendPasswordResetEmail(user.email, resetUrl);

    res.status(200).json(
      new apiResponse(200, "Password reset email sent successfully")
    );
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new apiError(500, "Failed to send password reset email"));
  }
});



export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return next(new apiError(400, "New password is required"));
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  }).select("+password");

  if (!user) {
    return next(new apiError(400, "Invalid or expired reset token"));
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json(
    new apiResponse(200, "Password reset successful")
  );
});

export const uploadAvatar = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

try {
    let avatar;
    if (req.file) {
      const img = await uploadImage(req.file.path);
      avatar = {
        public_id: img.id,
        url: img.url
      }
    }
  
    if(fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  
    user.avatar = avatar;
    await user.save();
  
    res.status(200).json(
      new apiResponse(200, "Avatar uploaded successfully", {
        user: user.toJSON()
      })
    );
} catch (error) {
  throw new apiError(500, "Failed to upload avatar", error.message);
}
});