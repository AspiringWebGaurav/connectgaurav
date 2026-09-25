/**
 * Global API Response Interface
 * Ensures all backend routes return the exact same predictable shape.
 */
export type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };


/**
 * Firestore Document Interface Skeleton
 * Replace with exact database fields when feature is built.
 */
export interface UserDocument {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: 'superadmin' | 'user';
  createdAt: Date;
  lastLoginAt: Date;
}

export interface SystemLogDocument {
  id: string;
  level: 'info' | 'warn' | 'error' | 'critical';
  message: string;
  metadata: Record<string, unknown>;
  timestamp: Date;
}
