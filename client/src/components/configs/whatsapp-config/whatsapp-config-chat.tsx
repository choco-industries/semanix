import { Card, CardProps } from "@mantine/core";

export interface WhatsappConfigChatProps extends CardProps {
    name: string;
}

export default function WhatsappConfigChat({
    name,
    ...props
}: WhatsappConfigChatProps) {
    return (
        <Card withBorder {...props}>
            {name}
        </Card>
    );
}
