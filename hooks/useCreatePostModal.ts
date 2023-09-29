import { create} from "zustand";

interface CreatePostModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useCreatePostModal  = create<CreatePostModalStore>((set, get) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}));

export default useCreatePostModal;
