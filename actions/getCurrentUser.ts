import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";


export async function getSession() {
    return await getServerSession(authOptions);
}


export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }          
        });

        if(!currentUser) {
            return null;
        }

        // return currentUser;
        return {
            ...currentUser,
            hashedPassword: null,
            email: null,
        };
        
    } catch (error: any) {
        return null;
    }
        
}
