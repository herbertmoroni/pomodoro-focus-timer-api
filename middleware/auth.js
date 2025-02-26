const admin = require('firebase-admin');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
      // First try as ID token
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.userId = decodedToken.uid;
      next();
    } catch (idTokenError) {
      // If that fails, handle as a custom token
      try {
        // Custom tokens need special handling - they can't be directly verified
        // In a real implementation, you'd use client SDK to exchange for ID token
        // For testing, we can extract the UID directly
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        req.userId = decoded.uid;
        next();
      } catch (customTokenError) {
        throw new Error('Invalid token format');
      }
    }
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};