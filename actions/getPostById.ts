import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb"

interface IParams {
    postId?: string;
}

export async function getPostById(
    params: IParams
) {

    try {
        const { postId } = params;
        
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
                
            },
            include: {
                comments: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        },
                        content: true,
                        createdAt: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        username: true,
                    }
                },
                

            }, 
        });

        if(!post) {
            return null;
        }

        return post;
    } catch (error: any) {

        throw new Error(error);
        
    }

}