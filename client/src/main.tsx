import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import { SessionProvider, authConfigManager } from "@hono/auth-js/react";
import "@mantine/core/styles.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import ModalProvider from "./providers/ModalProvider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

authConfigManager.setConfig({
    basePath: "/api/v1/auth"
})

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <SessionProvider>
                <MantineProvider>
                    <RouterProvider router={router} />
                    <ModalProvider />
                </MantineProvider>
            </SessionProvider>
        </StrictMode>
    );
}
