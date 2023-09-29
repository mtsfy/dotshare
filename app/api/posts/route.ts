import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export  async function POST (
    req: Request,
) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();

    const {
        title,
        caption,
        imageSrc,
    } = body;

    const post = await prisma.post.create({
        data: {
            title,
            caption,
            imageSrc,
            userId: currentUser.id,
            
        }
    });

    return NextResponse.json(post);

}

export async function DELETE (
    req: Request,
    
) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();

    const {
        postId
    } = body;

    const post = await prisma.post.findFirst({
        where: {
            id: postId
        }
    });

    if(!post) {
        return NextResponse.error();
    }

    if(post.userId !== currentUser.id) {
        return NextResponse.error();
    }

    const updated = await prisma.post.deleteMany({
        where: {
            id: postId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(updated);

}


export async function PATCH (
    req: Request,
    
) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();

    const {
        caption,
        title,
        image,
        postId,
    } = body;

    const post = await prisma.post.findFirst({
        where: {
            id: postId,
            userId: currentUser.id,
        }
    });

    if(!post) {
        return NextResponse.error();
    }

    if(post.userId !== currentUser.id) {
        return NextResponse.error();
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
            userId: currentUser.id
        },
        data: {
            imageSrc: image,
            caption: caption,
            title: title,
        }
    });

    return NextResponse.json(updatedPost);

}