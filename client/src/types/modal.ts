import { ModalProps } from "@mantine/core";

export interface CustomModalProps
    extends Omit<ModalProps, "opened" | "onClose">,
    Partial<Pick<ModalProps, "onClose">> { }

export interface ModalObject {
    id: string;
    component: React.ReactNode;
    props?: CustomModalProps;
}

export interface ModalStore {
    modals: Array<ModalObject>;
    open(component: React.ReactNode, props?: CustomModalProps): ModalObject["id"];
    close(id?: string): void;
    // promise(component: React.FC<CustomModalProps>): void;
}
