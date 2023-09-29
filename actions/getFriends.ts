import { getCurrentUser } from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export async function getFriends () {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const {followedByIDs, followingIDs} = currentUser;

        const friends = [];

        // Iterate through users the current user follows
       for (const followedUserId of followingIDs) {
           // Check if the followed user also follows the current user
           if (followedByIDs.includes(followedUserId)) {
             // If they follow each other, they are friends
             const friend = await prisma.user.findUnique({
               where: {
                 id: followedUserId,
               },
               select: {
                  id: true,
                  name: true,
                  username: true, 
                  image: true,
                  category: true
               }
             });
             friends.push(friend);
           }
         }

         return friends;

    } catch (error: any) {
        throw new Error(error);
    }
}