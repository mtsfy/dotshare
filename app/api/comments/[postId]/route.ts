import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

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

    const body = await req.json();

    const { content } = body;

    if(!content) {
        throw new Error("Invalid comment.");
    } 

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if(!post) {
        throw new Error("Post does not exist.");
    }


    const comment = await prisma.comment.create({
        data: {
            userId: currentUser.id,
            postId,
            content,
            
        }
    });
    

    return NextResponse.json(comment);

}