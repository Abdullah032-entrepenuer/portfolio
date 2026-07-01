import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Abdullah@1122';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    if (password === ADMIN_PASSWORD) {
      const payload = {
        admin: true,
        exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
      };
      
      const data = Buffer.from(JSON.stringify(payload)).toString('base64');
      const signature = crypto.createHmac('sha256', ADMIN_PASSWORD).update(data).digest('hex');
      const token = `${data}.${signature}`;
      
      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
