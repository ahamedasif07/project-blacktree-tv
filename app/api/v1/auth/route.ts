import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const res = NextResponse.json({success: true, message: "Authentication successful"})


	
    return res;
}