import MainLayout from "@/layouts/main-layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <MainLayout>
        </MainLayout>
    );
}
