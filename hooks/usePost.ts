import { useParams } from "next/navigation";
import { useMemo } from "react";

const usePost = () => {
  const params = useParams();

  const postId = useMemo(() => {
    if (!params?.postId) {
      return '';
    }

    return params.postId as string;
  }, [params?.postId]);

  const isOpen = useMemo(() => !! postId, [postId]);

  return useMemo(() => ({
    isOpen,
    postId
  }), [isOpen, postId]);
};

export default usePost;