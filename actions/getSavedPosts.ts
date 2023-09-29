import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export async function getSavedPosts () {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const saved = await prisma.post.findMany({
            where: {
                id: {
                    in: [...(currentUser.savedIds || [])],
                },
            },
            orderBy: {
                updatedAt: "desc"
            }
        });

        

        return saved;        
    } catch (error: any) {
        throw new Error(error);
    }
}