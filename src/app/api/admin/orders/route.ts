import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

function verifyAdminSession(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get('admin_session')?.value;
  if (!sessionCookie) return false;

  const sessionSecret = process.env.ADMIN_SESSION_SECRET || 'default-session-secret';
  const parts = sessionCookie.split('.');
  if (parts.length !== 2) return false;

  const [dataBase64, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', sessionSecret)
    .update(dataBase64)
    .digest('hex');

  if (signature !== expectedSignature) return false;

  try {
    const data = JSON.parse(Buffer.from(dataBase64, 'base64').toString());
    if (Date.now() > data.expiresAt) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const search = req.nextUrl.searchParams.get('search') || '';
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
    const limit = 20;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { customerName: { contains: search } },
            { email: { contains: search } },
            { id: { contains: search } },
            { gatewayOrderId: { contains: search } },
          ],
        }
      : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          product: { select: { name: true } },
          _count: { select: { downloadLogs: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Admin orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
