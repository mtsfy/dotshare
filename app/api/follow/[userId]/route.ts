import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

interface IParams {
    userId: string;
}



export async function POST (
    req: Request,
    {params}: {params: IParams},
) {


    const currentUser = await getCurrentUser();

    if(!currentUser) {
        throw NextResponse.error();
    }

    const {userId} = params;


    if(!userId || typeof userId!== "string") { 
        throw new Error("Invalid userId.");
    }

   const userToFollow = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      if (!userToFollow) {
        throw new Error('Invalid User.');
      }


    let followingIds = [...(currentUser.followingIDs || [])]; // current user followingId list
    let followedByIds = [...(userToFollow.followedByIDs || [])];  // the person the user wants to follow

    if(!followingIds.includes(userId) && !followedByIds.includes(userId)) {
        followingIds.push(userId); // add to followingIds
        followedByIds.push(currentUser.id); //add to followedByIds

    }
    

   
   const updatedCurrentUser = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIDs: followingIds,
        },select: {
            hashedPassword: false,
            email: false,
            id: true,
            name: true,
            image: true
        }
   });


   const updatedUserToFollow = await prisma.user.update({
    where: {
        id: userId,
    },
    data: {
        followedByIDs: followedByIds,
    },select: {
        hashedPassword: false,
        email: false,
        id: true,
        name: true,
        image: true
    }
   });

   return NextResponse.json({updatedCurrentUser, updatedUserToFollow});    

}



export async function DELETE (
    req: Request,
    {params}: {params: IParams},
) {


    const currentUser = await getCurrentUser();

    if(!currentUser) {
        throw NextResponse.error();
    }

    const {userId} = params;


    if(!userId || typeof userId!== "string") { 
        throw new Error("Invalid userId.");
    }

   const userToUnfollow = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      if (!userToUnfollow) {
        throw new Error('Invalid User.');
      }


    let followingIds = [...(currentUser.followingIDs || [])]; // current user followingId list
    followingIds = followingIds.filter(id => id !== userId) //add all ids except, except the userId to unfollow

    // let following = [...(currentUser.following || [])]; // current user following  list (user object)
    // following.push(user); // add user object to current user following list


    // let followedBy = [...(user.followedBy) || []]; //the user that is being followed gets their followed by updated
    // followedBy.push(currentUser); // add the current user to their followedby list

    let followedByIds = [...(userToUnfollow.followedByIDs || [])]; //userToUnfollow list of following ids
    followedByIds = followingIds.filter(id => id !== currentUser.id) // remove the current user from the followedby list from the user

   
    const updatedCurrentUser = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIDs: followingIds,
        },select: {
            hashedPassword: false,
            email: false,
            id: true,
            name: true,
            image: true
        }
   });


   const updatedUserToUnfollow = await prisma.user.update({
    where: {
        id: userId,
    },
    data: {
        followedByIDs: followedByIds,
    },select: {
        hashedPassword: false,
        email: false,
        id: true,
        name: true,
        image: true
    }
   });

   return NextResponse.json({updatedCurrentUser, updatedUserToUnfollow});    

}