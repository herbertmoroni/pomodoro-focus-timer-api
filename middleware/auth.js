exports.protect = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.userId = decodedToken.uid;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };