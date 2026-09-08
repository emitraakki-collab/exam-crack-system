import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { generateDownloadToken } from '@/lib/download-token';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing payment verification details.' },
        { status: 400 }
      );
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET not configured');
      return NextResponse.json(
        { success: false, error: 'Payment verification configuration error.' },
        { status: 500 }
      );
    }

    const body_data = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body_data)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      // Mark order as failed
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'FAILED' },
      });

      return NextResponse.json(
        { success: false, error: 'Payment verification failed. Invalid signature.' },
        { status: 400 }
      );
    }

    // Verify order exists and is pending
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found.' },
        { status: 404 }
      );
    }

    if (order.paymentStatus === 'PAID') {
      // Already paid — return existing token
      return NextResponse.json({
        success: true,
        orderId: order.id,
        downloadToken: order.downloadToken || '',
      });
    }

    // Generate secure download token
    const { token, expiresAt } = generateDownloadToken(orderId, 24);

    // Update order as PAID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        gatewayPaymentId: razorpay_payment_id,
        gatewaySignature: razorpay_signature,
        paidAt: new Date(),
        downloadToken: token,
        downloadTokenExpiresAt: expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: orderId,
      downloadToken: token,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed. Please contact support.' },
      { status: 500 }
    );
  }
}
