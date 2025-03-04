import type { WhatsappChats } from "@semanix/common/types";
import WhatsappConfigChat from "./whatsapp-config-chat";
import { Stack } from "@mantine/core";

export default function WhatsappConfigLeftBar({
    chats,
}: {
    chats: WhatsappChats[];
}) {
    return (
        <Stack>
            {chats.map((chat) => (
                <WhatsappConfigChat name={chat.name} />
            ))}
        </Stack>
    );
}
