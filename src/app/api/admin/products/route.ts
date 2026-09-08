import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
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

const updateProductSchema = z.object({
  price: z.number().min(100, 'Minimum price is ₹1').optional(),
  originalPrice: z.number().min(100).nullable().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const product = await prisma.product.findFirst({ where: { active: true } });
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest) {
  if (!verifyAdminSession(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const product = await prisma.product.findFirst({ where: { active: true } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updated = await prisma.product.update({
      where: { id: product.id },
      data: validation.data,
    });

    return NextResponse.json({ product: updated });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
