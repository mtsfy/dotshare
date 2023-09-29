"use client";
import { SafeUser } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface IUseLike {
    postId: string;
    currentUser: User;
}

const useLike = ({postId, currentUser}: IUseLike) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const hasLiked = useMemo(()=> {
        const list = currentUser.likedIds || []; // get current likes
        return list.includes(postId); // return true if liked
    },[postId, currentUser]);


    const toggleLike = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();

        try {
            let req;
            if (hasLiked) {
                req = () => axios.delete(`/api/likes/${postId}`);
            } else {
                req = () => axios.post(`/api/likes/${postId}`);
            }

            setIsLoading(true);
            await req();
            router.refresh();
            setIsLoading(false);

        } catch (error) {
            toast.error("Something went wrong.")
        }

    },[hasLiked, postId, router]);

     

    return { hasLiked, toggleLike, isLoading };

}

export default useLike;