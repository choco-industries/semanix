import { useState } from "react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import WhatsappConfig, {
  WhatsappConfigModalProps,
} from "@/components/configs/whatsapp-config/whatsapp-config";
import classes from "./sidebar.module.scss";
import modal from "@/utils/modal";

interface SidebarItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ label, active, onClick }: SidebarItemProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      ></UnstyledButton>
    </Tooltip>
  );
}

const data = [
  {
    label: "Whatsapp",
    form: <WhatsappConfig />,
    formProps: WhatsappConfigModalProps,
  },
];

export default function Sidebar() {
  const [active, setActive] = useState<Array<number>>([]);

  const links = data.map((link, index) => (
    <SidebarItem
      {...link}
      key={link.label}
      active={active.includes(index)}
      onClick={() => {
        setActive((prev) => {
          if (prev.includes(index)) {
            return prev.filter((item) => item !== index);
          }
          if (link.form) {
            console.log("Opening Modal");
            modal.open(link.form, link.formProps);
          }
          return [...prev, index];
        });
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center></Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}
