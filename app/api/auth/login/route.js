import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  // Mock Authentication Logic
  if (email && password) {
    let role = "user";
    let redirect = "/dashboard";
    
    // Simple admin check based on email
    if (email.includes("admin")) {
      role = "admin";
      redirect = "/admin";
    }

    const response = NextResponse.json({ success: true, redirect, role });
    
    // Set a mock secure cookie
    response.cookies.set({
      name: "medsupply_auth",
      value: JSON.stringify({ email, role }),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}
