import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export async function getLikedPosts () {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const liked = await prisma.post.findMany({
            where: {
                id: {
                    in: [...(currentUser.likedIds || [])],
                },
                
            },
            orderBy: {
                updatedAt: "desc"
            }
        });

        return liked;        
    } catch (error: any) {
        throw new Error(error);
    }
}