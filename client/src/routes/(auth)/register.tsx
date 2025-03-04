import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="p-2">
      <h3>Welcome Login!</h3>
    </div>
  );
}
