import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/db.types';

/**
 * Standardizes successful API responses.
 * Usage: return apiSuccess({ user: "Gaurav" }, 200);
 */
export function apiSuccess<T>(data: T, status: number = 200) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(response, { status });
}

/**
 * Standardizes API error responses.
 * Usage: return apiError("Unauthorized", 401);
 */
export function apiError(message: string, status: number = 500) {
  const response: ApiResponse<null> = {
    success: false,
    error: message,
  };
  return NextResponse.json(response, { status });
}
