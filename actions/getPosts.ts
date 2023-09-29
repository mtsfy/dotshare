import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getPosts() {
    try {

    const posts = await prisma.post.findMany({
        
        include: {
          user: {
            select: {
              name: true,
              id: true,
              username: true,
              image: true
            }
          },
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        },
      });


   
    return posts;

        

    } catch (error: any) {
        return null;
    }
        
}
