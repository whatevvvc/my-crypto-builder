import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createPayment } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const { productId, siteId } = await req.json();

    // 1. Fetch Product details (Secure source of truth)
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    // 2. Fetch Merchant's API Key
    const siteSettings = await prisma.siteSettings.findUnique({
      where: { siteId: siteId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!siteSettings?.nowPaymentsApiKey) {
      return NextResponse.json({ error: "Merchant wallet not configured" }, { status: 400 });
    }

    // 3. Create Crypto Invoice
    const invoice = await createPayment(
      product.price,
      product.currency,
      siteSettings.nowPaymentsApiKey
    );

    // 4. Return the payment URL to the frontend
    return NextResponse.json({ url: invoice.invoice_url });

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}