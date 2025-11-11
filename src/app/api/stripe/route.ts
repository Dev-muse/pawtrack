import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const data = await request.json();
  // validate req

  // get user email
  const userEmail = data?.data?.object?.customer_email;

  if(!userEmail){
     return Response.json({message:'user not found'}, { status: 400 });
  }
  // update db

  await prisma?.user.update({
    where: {
      email: userEmail,
    },
    data: {
      hasAccess: true,
    },
  });
  // return

  return Response.json(null, { status: 200 });
}
