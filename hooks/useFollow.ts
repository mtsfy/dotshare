"use client";
import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface IUseFollow {
    userId: string;
    currentUser: Record<string, any>;
}

const useFollow = ({userId, currentUser}: IUseFollow) => {

    const router = useRouter();
    const isFollowing = useMemo(()=> {
        const list = currentUser.followingIDs || []; // get current following
        return list.includes(userId); // return true if following
    },[userId, currentUser]);
    const [isLoading, setIsLoading] = useState(false);


    const toggleFollow = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    )=>{

        e.stopPropagation();

        try {

            let req;
            if (isFollowing) {
                req = () => axios.delete(`/api/follow/${userId}`);
            } else {
                req = () => axios.post(`/api/follow/${userId}`);
            }
            setIsLoading(true);
            await req();
            router.refresh();
            setIsLoading(false);


        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false);
        }

    },[isFollowing, userId, router]);

     

    return { isFollowing, toggleFollow, isLoading };

}

export default useFollow;