import { parseNumber } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const data = await request.json();
  const { coin, type, quantity, price, email } = data;

  const quantityFloat = parseNumber(quantity);
  const priceFloat = parseNumber(price);

  const amount = quantityFloat * quantityFloat;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  try {
    const newOrder = await prisma.order.create({
      data: {
        type,
        coin,
        quantity: quantityFloat,
        price: priceFloat,
        amount,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
