"use client";
import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface IUseSave {
    postId: string;
    currentUser: Record<string, any>;
}

const useSave = ({postId, currentUser}: IUseSave) => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const hasSaved = useMemo(()=> {
        const list = currentUser.savedIds || []; // get current likes
        return list.includes(postId); // return true if liked
    },[postId, currentUser]);


    const toggleSave = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();

        try {
            let req;
            if (hasSaved) {
                req = () => axios.delete(`/api/saved/${postId}`);
            } else {
                req = () => axios.post(`/api/saved/${postId}`);
            }
            setIsLoading(true);
            await req();
            router.refresh();
            setIsLoading(false);
            if(hasSaved) {
                toast.success("Removed from saved.")
            } else {
                toast.success("Added to saved.")
            }
        } catch (error) {
            toast.error("Something went wrong.")
        }

    },[hasSaved, postId, router]);

     

    return { hasSaved, toggleSave, isLoading };

}

export default useSave;