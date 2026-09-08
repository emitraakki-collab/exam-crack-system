import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { generateDownloadToken } from '@/lib/download-token';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      // Find the order
      const order = await prisma.order.findFirst({
        where: { gatewayOrderId: razorpayOrderId },
      });

      if (order && order.paymentStatus !== 'PAID') {
        const { token, expiresAt } = generateDownloadToken(order.id, 24);

        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'PAID',
            gatewayPaymentId: payment.id,
            paidAt: new Date(),
            downloadToken: token,
            downloadTokenExpiresAt: expiresAt,
          },
        });

        console.log(`Webhook: Order ${order.id} marked as PAID`);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
