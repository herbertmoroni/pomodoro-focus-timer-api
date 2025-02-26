const User = require('../models/user.mongoose');
const admin = require('firebase-admin');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, displayName } = req.body;
  
  // Create user in Firebase (handles password hashing)
  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName
  });
  
  // Store user reference in MongoDB (no password)
  const user = await User.create({
    firebaseUid: userRecord.uid,
    email,
    displayName: displayName || email.split('@')[0]
  });
  
  // Generate token
  const token = await admin.auth().createCustomToken(userRecord.uid);
  
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName
      }
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Note: This would normally use Firebase SDK client-side
  // For demo purposes, we'll use a simulated approach
  
  // Check if user exists in Firebase
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    
    // Generate custom token
    const token = await admin.auth().createCustomToken(userRecord.uid);
    
    // Get user from MongoDB
    const user = await User.findOne({ firebaseUid: userRecord.uid });
    
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName
        }
      }
    });
  } catch (error) {
    return next(new AppError('Invalid credentials', 401));
  }
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ firebaseUid: req.userId });
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        settings: user.settings
      }
    }
  });
});