import { Button, Stack, FileButton, Text } from "@mantine/core";
import classes from "./whatsapp-config.module.scss";
import { useState } from "react";
import WhatsappConfigLeftBar from "./whatsapp-config-left-bar";
import type { WhatsappChats } from "@semanix/common/types";
import { CustomModalProps } from "@/types/modal";
import uploadChat from "@/server/whatsapp/uploadChat";

const chats = [
    { name: "Rakshit Gumber", fileId: "Hello" },
] satisfies WhatsappChats[];

export const WhatsappConfigModalProps = {
    fullScreen: true,
    radius: 0,
    withCloseButton: false,
    title: "Manage Chats",
    className: classes.modal,
} satisfies CustomModalProps;

export default function WhatsappConfig() {
    const [file, setFile] = useState<File | null>(null);
    return (
        <Stack className={classes.root}>
            {chats.length > 0 && <WhatsappConfigLeftBar chats={chats} />}
            <Stack>
                Start By adding Some chats
                <FileButton onChange={setFile} accept=".zip,.txt">
                    {(props) => <Button {...props}>Add a chat</Button>}
                </FileButton>
                {file && (
                    <>
                        <Text size="sm" ta="center" mt="sm">
                            Picked file: {file.name}
                        </Text>
                        <Button onClick={() => {
                            uploadChat(file)
                        }} >
                            Upload
                        </Button>
                    </>
                )}
            </Stack>
        </Stack>
    );
}
