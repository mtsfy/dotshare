import { create} from "zustand";

interface SignUpModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useSignUpModal  = create<SignUpModalStore>((set, get) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}));

export default useSignUpModal;
