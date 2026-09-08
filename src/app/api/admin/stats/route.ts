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
  const expectedSignature = crypto.createHmac('sha256', sessionSecret).update(dataBase64).digest('hex');
  if (signature !== expectedSignature) return false;
  try {
    const data = JSON.parse(Buffer.from(dataBase64, 'base64').toString());
    return Date.now() <= data.expiresAt;
  } catch { return false; }
}

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalOrders, paidOrders, todayOrders, totalRevenue, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { paymentStatus: 'PAID' } }),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { amount: true },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { product: { select: { name: true } } },
      }),
    ]);

    return NextResponse.json({
      totalOrders,
      paidOrders,
      todayOrders,
      totalRevenue: (totalRevenue._sum.amount || 0) / 100, // Convert from paise to rupees
      recentOrders,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
