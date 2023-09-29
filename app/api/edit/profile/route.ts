import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH (
    req: Request
) {
    try {
        
        const currentUser = await getCurrentUser();

        const body = await req.json();
    
        const {name, username, bio, category, image} = body;
    
        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
    
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            }, 
            data: {
                name,
                username,
                bio,
                category, 
                image,
            },
            select: {
                hashedPassword: false,
                email: false,
                username: true,
                name: true,
                category: true,
                bio: true,
                image: true,
                posts: true,
                followedByIDs: true,
                followingIDs: true, 
            }
        })


        return NextResponse.json(updatedUser);

    } catch (error) {

        console.log(error, "ERROR_MSG");
        return new NextResponse("Error", {status: 500});
        
    }

}