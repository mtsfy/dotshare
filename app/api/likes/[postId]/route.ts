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


    const userLikedIds = [...(currentUser.likedIds || [])];
    userLikedIds.push(postId);

    const postLikeIds = [...(postExists.likeIds || [])];
    postLikeIds.push(currentUser.id);


    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            likeIds: postLikeIds,
        }
    });

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id,
        
        },
        data: {
            likedIds: userLikedIds
        }
    });
    

    return NextResponse.json({updatedUser, updatedPost});
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

    let postLikeIds = [...(postExists.likeIds || [])];
    postLikeIds = postLikeIds.filter(id => id!== currentUser.id);


    let userLikedIds = [...(currentUser.likedIds || [])];
    userLikedIds = userLikedIds.filter((id) => id!== postId);

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            likeIds: postLikeIds,
        }
    });

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id,
        
        },
        data: {
            likedIds: userLikedIds
        }
    });

    return NextResponse.json({updatedUser, updatedPost});
}