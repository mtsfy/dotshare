import { create} from "zustand";

interface DeletePostModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useDeletePostModal  = create<DeletePostModalStore>((set, get) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}));

export default useDeletePostModal;
