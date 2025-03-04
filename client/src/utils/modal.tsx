import type { CustomModalProps, ModalStore } from "@/types/modal";
import { create } from "zustand";

export const useModalStore = create<ModalStore>((set, get) => ({
    modals: [],
    open(component, props) {
        const id = crypto.randomUUID();
        const state = get();
        const modals = [...state.modals, { component, id, props }];
        set({ modals });
        return id;
    },
    close(id) {
        const state = get();
        if (!id) {
            const modals = state.modals.slice(0, -1);
            set({ modals });
        } else {
            const modals = state.modals.filter((modal) => modal.id !== id);
            set({ modals });
        }
    },
}));

const modal = {
    open: useModalStore.getState().open,
    close: useModalStore.getState().close,
    brand: (component: React.ReactNode, props?: CustomModalProps) =>
        useModalStore.getState().open(component, props),
};

export default modal;
