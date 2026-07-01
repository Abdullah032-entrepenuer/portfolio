import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [data, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', ADMIN_PASSWORD).update(data).digest('hex');
  if (signature !== expectedSignature) return false;
  
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
    if (payload.exp < Date.now()) return false;
    return true;
  } catch (e) {
    return false;
  }
}
