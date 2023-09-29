import { NextResponse } from "next/server";
import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb"

interface IParams {
    userId?: string;
}

export async function getFollowersById(
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
        
        const followersList = await prisma.user.findMany({
            where: {
                id: {
                    in: [...(user.followedByIDs || [])]
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
                category: true,
                

            }
        });

        return followersList;

      
    } catch (error: any) {

        throw new Error(error);
        
    }

}