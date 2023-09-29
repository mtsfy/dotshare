import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";

export async function GET(
    req: Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();

    const {userId} = body;

    if(!userId) {
        throw new Error();
    }

    const profile = await prisma.user.findFirst({
        where: {
            id: userId,
        }
            
    });


    if(!profile) {
        return NextResponse.error();
    }

    
    return NextResponse.json(profile);
}

