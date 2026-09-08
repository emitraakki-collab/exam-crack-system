import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET || 'default-session-secret';

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not configured.' },
        { status: 500 }
      );
    }

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Create session token
    const sessionData = JSON.stringify({
      username,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    const sessionToken = crypto
      .createHmac('sha256', sessionSecret)
      .update(sessionData)
      .digest('hex');

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', `${Buffer.from(sessionData).toString('base64')}.${sessionToken}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Login failed.' },
      { status: 500 }
    );
  }
}
