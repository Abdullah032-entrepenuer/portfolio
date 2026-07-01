import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPortfolioData, writePortfolioData } from '@/lib/db';
import { verifySessionToken } from '@/lib/auth';

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    
    if (!verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    if (!body.hero || !body.services || !body.projects || !body.about || !body.contact) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    
    const success = await writePortfolioData(body);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
