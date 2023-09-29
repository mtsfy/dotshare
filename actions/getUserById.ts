import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb"

interface IParams {
    userId?: string;
}

export async function getUserById(
    params: IParams
) {

    try {
        const { userId } = params;
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                image: true,
                username: true, 
                category: true, 
                bio: true,
                hashedPassword: false,
                email: false,
                name: true,
                posts: {
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                followingIDs: true,
                followedByIDs: true,
            }
        });

        if(!user) {
            return null;
        }

        return user;
    } catch (error: any) {

        throw new Error(error);
        
    }

}