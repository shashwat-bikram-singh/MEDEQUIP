import products from "@/data/products.json";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Can add search params logic here later
  return NextResponse.json(products);
}
