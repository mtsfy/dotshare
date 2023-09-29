import { NextResponse } from "next/server";
import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb"

interface IParams {
    userId?: string;
}

export async function getFollowingById(
    params: IParams
) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return [];
    }

    try {
        const { userId } = params;


        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });


        if(!user) {
            return [];
        }
        
        const followingList = await prisma.user.findMany({
            where: {
                id: {
                    in: [...(user.followingIDs || [])]
                }
            },
            select: {
                id: true,
                name: true,
                image: true,
                email: false,
                hashedPassword: false,
                followedByIDs: true,
                followingIDs: true,
                username: true,
                category: true
            }
        });

        return followingList;

      
    } catch (error: any) {

        throw new Error(error);
        
    }

}