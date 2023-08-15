import { create} from "zustand";

interface SignInModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useSignInModal  = create<SignInModalStore>((set, get) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}));

export default useSignInModal;
