import products from "@/data/products.json";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  return NextResponse.json(product);
}
