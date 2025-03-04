import modal, { useModalStore } from "@/utils/modal";
import { Modal, useModalsStack } from "@mantine/core";

export default function ModalProvider() {
    const modals = useModalStore((state) => state.modals);
    const stack = useModalsStack(modals.map(({ id }) => id));

    return (
        <Modal.Stack>
            {modals.map(({ component, props, id }) => (
                <Modal
                    {...stack.register(id)}
                    key={id}
                    opened={true}
                    onClose={
                        props?.onClose
                            ? props.onClose
                            : () => {
                                modal.close(id);
                            }
                    }
                    title={props?.title}
                    {...props}
                >
                    {component}
                </Modal>
            ))}
        </Modal.Stack>
    );
}
