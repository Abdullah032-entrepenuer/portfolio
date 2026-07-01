import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    const isValid = verifySessionToken(token);
    
    return NextResponse.json({ success: isValid });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
