import { adminAuth } from '../firebase/admin';
import { env } from '../config/env';

/**
 * Mathematically verifies a Firebase ID Token using the Admin SDK and 
 * ensures the decoded email EXACTLY matches the encrypted superadmin email.
 */
export async function verifySuperadmin(idToken: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    if (decodedToken.email !== env.SUPERADMIN_EMAIL) {
      console.warn(`Unauthorized access attempt by: ${decodedToken.email}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying superadmin token:', error);
    return false;
  }
}
