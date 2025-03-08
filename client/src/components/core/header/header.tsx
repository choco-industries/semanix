import { ModeToggleButton } from "@/components/composables/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "@hono/auth-js/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="p-4 flex w-full justify-end gap-4">
      {!session ? <Button>Sign Up</Button> : null}
      <ModeToggleButton />
    </div>
  );
};
export default Header;
