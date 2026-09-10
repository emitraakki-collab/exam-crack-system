export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { verifyDownloadToken } from '@/lib/download-token';

// Rate limit downloads
const downloadRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    const orderId = req.nextUrl.searchParams.get('orderId');

    if (!token || !orderId) {
      return NextResponse.json(
        { error: 'Missing download credentials.' },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const now = Date.now();
    const rateEntry = downloadRateLimit.get(ipHash);
    if (rateEntry && now < rateEntry.resetAt && rateEntry.count > 10) {
      return NextResponse.json(
        { error: 'Too many download attempts. Please try again later.' },
        { status: 429 }
      );
    }
    if (!rateEntry || now > (rateEntry?.resetAt || 0)) {
      downloadRateLimit.set(ipHash, { count: 1, resetAt: now + 3600000 });
    } else {
      rateEntry.count++;
    }

    // Verify download token
    const tokenOrderId = verifyDownloadToken(token);
    if (!tokenOrderId || tokenOrderId !== orderId) {
      return NextResponse.json(
        { error: 'Invalid or expired download link. Please contact support.' },
        { status: 403 }
      );
    }

    // Verify order is PAID
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true },
    });

    if (!order || order.paymentStatus !== 'PAID') {
      return NextResponse.json(
        { error: 'Order not found or payment not verified.' },
        { status: 403 }
      );
    }

    // Get file name with safe fallback
    const rawFileName = order.product?.fileStoragePath || 'exam-crack-system.pdf';
    const fileName = rawFileName.replace(/[^a-zA-Z0-9._-]/g, '') || 'exam-crack-system.pdf';

    // Multi-candidate file path resolution (Local Dev, Next build, Vercel Serverless Function)
    const candidatePaths = [
      path.join(process.cwd(), 'private-storage', fileName),
      path.resolve(process.cwd(), 'private-storage', fileName),
      path.resolve('./private-storage', fileName),
      path.join(__dirname, '../../../../private-storage', fileName),
      path.join(__dirname, '../../../private-storage', fileName),
      path.join(process.cwd(), '.next/server/private-storage', fileName),
    ];

    const filePath = candidatePaths.find((p) => existsSync(p));

    if (!filePath) {
      console.error(`Ebook file not found. Candidate paths tried: ${candidatePaths.join(' | ')}`);
      return NextResponse.json(
        { error: 'Ebook file not found. Please contact support.' },
        { status: 404 }
      );
    }

    // Log download
    await prisma.downloadLog.create({
      data: {
        orderId: order.id,
        ipHash: ipHash,
      },
    });

    // Read and stream file
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${order.product.name.replace(/[^a-zA-Z0-9 ]/g, '')}.pdf"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
