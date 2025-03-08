import { ChatBox } from "@/components/chat/chat-box";
import MainLayout from "@/layouts/main-layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <MainLayout className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-foreground text-4xl font-semibold">
        Let me do it for you!
      </h1>
      <ChatBox />
    </MainLayout>
  );
}
