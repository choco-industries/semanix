import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { SessionProvider, authConfigManager } from "@hono/auth-js/react";
import ModalProvider from "./providers/ModalProvider";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./providers/theme-provider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

authConfigManager.setConfig({
  basePath: "/api/v1/auth",
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <SessionProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <ModalProvider />
        </ThemeProvider>
      </SessionProvider>
    </StrictMode>
  );
}
