// generate-admin-token.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK with credentials from .env
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
});

// User ID for which to generate a token - you can use any existing user UID
// This is typically found in Firebase Authentication console
const TEST_USER_UID = process.env.TEST_USER_UID || 'default-test-uid';
console.log('TEST_USER_UID:', TEST_USER_UID);

async function generateAdminToken() {
  try {
    // Create a custom token for the test user
    const customToken = await admin.auth().createCustomToken(TEST_USER_UID);
    
    console.log('\n===== FIREBASE ADMIN CUSTOM TOKEN =====\n');
    console.log(customToken);
    console.log('\n=======================================\n');
    console.log('✅ Copy this token into REST client file');
    console.log('⏱️ Token will expire in 1 hour\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error generating token:');
    console.error(error.message);
    
    process.exit(1);
  }
}

generateAdminToken();