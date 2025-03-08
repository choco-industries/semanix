import { Header } from "@/components/core/header";
import { cn } from "@/lib/utils";

const MainLayout: React.FC<React.ComponentProps<"main">> = ({
  children,
  ...props
}) => {
  return (
    <>
      <Header />
      <main {...props} className={cn("h-[calc(100svh-68px)]", props.className)}>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
