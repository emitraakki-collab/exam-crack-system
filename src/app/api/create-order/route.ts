import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getRazorpay } from '@/lib/razorpay';

const createOrderSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
});

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { fullName, email, mobile } = validation.data;

    // Get product price from database (NEVER trust frontend)
    const product = await prisma.product.findFirst({
      where: { active: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not available.' },
        { status: 404 }
      );
    }

    // Create real Razorpay order using API credentials
    const razorpay = getRazorpay();

    const razorpayOrder = await razorpay.orders.create({
      amount: product.price, // Amount in paise from database
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId: product.id,
        customerName: fullName,
        email: email,
      },
    });

    const razorpayOrderId = razorpayOrder.id;

    // Save order to database
    const order = await prisma.order.create({
      data: {
        customerName: fullName,
        email: email,
        mobile: mobile,
        productId: product.id,
        amount: product.price,
        currency: 'INR',
        paymentStatus: 'PENDING',
        gatewayOrderId: razorpayOrderId,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId: razorpayOrderId,
      amount: product.price,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '',
      productName: product.name,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}
