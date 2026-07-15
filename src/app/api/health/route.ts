import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis/upstash';
import { adminRealtime } from '@/lib/firebase/admin';

export async function GET() {
  try {
    // Ping Upstash Redis
    await redis.ping();
    
    // Ping Firebase Realtime Database
    await adminRealtime.ref('.info/connected').once('value');

    return NextResponse.json({
      status: 'ok',
      message: 'ConnectGaurav API is healthy. Server-side caching (Redis) and Firebase are connected.',
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Backend degraded',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}
