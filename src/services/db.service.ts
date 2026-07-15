import { adminDb } from '../lib/firebase/admin';
import { redis } from '../lib/redis/upstash';

export class DBService {
  /**
   * Get user data from Redis Server Cache, fallback to Firebase
   * Note: This strictly avoids local browser storage/cache.
   */
  static async getUserData(userId: string) {
    const cacheKey = `user:${userId}`;
    
    // Try Server-Side Redis cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Fallback to Firebase Backend
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const data = userDoc.data();
      // Cache on the backend for 1 hour
      await redis.setex(cacheKey, 3600, JSON.stringify(data));
      return data;
    }

    return null;
  }
}
