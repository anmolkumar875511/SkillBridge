import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import apiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return next(new apiError(400, "Missing required fields"));
  }

  if (req.body.role && req.body.role !== 'Student') {
    return next(new apiError(403, "Invalid role assignment"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new apiError(400, "User with this email already exists"));
  }

  const user = new User({ name, email, password});
  await user.save();

  res.status(201).json(
    new apiResponse(201, "User registered successfully", { user: user.toJSON() })
  );
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError(400, "Missing email or password"));
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    return next(new apiError(401, "Invalid email or password"));
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1000 * 60 * 15 // 15 minutes
  });

  res.status(200).json(
    new apiResponse(200, "Login successful", { user: user.toJSON(), accessToken, refreshToken })
  );
});



export const getUserProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json(
    new apiResponse(200, "User profile fetched successfully", { user: req.user.toJSON() })
  );
});



export const logoutUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  user.refreshToken = null;
  await user.save();

  res.clearCookie("accessToken");

  res.status(200).json(
    new apiResponse(200, "Logout successful")
  );
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body.refreshToken || req.cookies.refreshToken;
    
    if (!refreshToken) {
        return next(new apiError(401, "Refresh token missing"));
    }
    
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ _id: decoded.id, refreshToken });
    if (!user) {
        return next(new apiError(401, "Invalid refresh token"));
    }
    
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();
    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 15 // 15 minutes
    });
    
    res.status(200).json(
        new apiResponse(200, "Access token refreshed successfully", { accessToken, refreshToken: newRefreshToken })
    );
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { name } = req.body;

  if (!name) {
    return next(new apiError(400, "Missing required fields"));
  }

  user.name = name;
  await user.save();

  res.status(200).json(
    new apiResponse(200, "User profile updated successfully", { user: user.toJSON() })
  );
});

export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new apiError(400, "Missing required fields"));
  }

  if (!(await user.isPasswordMatch(currentPassword))) {
    return next(new apiError(401, "Current password is incorrect"));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json(
    new apiResponse(200, "Password changed successfully")
  );
});

// 1. registerUser
// 2. loginUser
// 3. getUserProfile
// 4. logoutUser
// 5. refreshAccessToken
// 6. updateUserProfile
// 7. changeUserPassword