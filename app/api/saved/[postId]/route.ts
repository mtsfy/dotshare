import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

interface IParams {
    postId: string;
}

export async function POST(
    req: Request,
    {params}: {params: IParams},
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        throw NextResponse.error();
    }

    const {postId} = params;


    if(!postId || typeof postId!== "string") { 
        throw new Error("Invalid postId.");
    }

    const postExists = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        
    });

    if(!postExists) {
        throw new Error("Post does not exist.");
    }


    const userSavedIds = [...(currentUser.savedIds || [])];
    userSavedIds.push(postId);


    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id,
        
        },
        data: {
            savedIds: userSavedIds
        }
    });
    

    return NextResponse.json(updatedUser);
}


export async function DELETE(
    req: Request,
    {params}: {params: IParams},
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        throw NextResponse.error();
    }

    const {postId} = params;

    if(!postId || typeof postId!== "string") { 
        throw new Error("Invalid postId.");
    }


    const postExists = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if(!postExists) {
        throw new Error("Post does not exist.");
    }
    
    let userSavedIds = [...(currentUser.savedIds || [])];
    userSavedIds = userSavedIds.filter((id) => id!== postId);

    
    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id,
        
        },
        data: {
            savedIds: userSavedIds
        }
    });

    return NextResponse.json(updatedUser);
}