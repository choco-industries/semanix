import PublicLayout from "@/layouts/public-layout/public-layout";
import { Button, Center, Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import classes from "./login.module.scss"
import { IconBrandGithubFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { signIn } from "@hono/auth-js/react";

export const Route = createFileRoute("/(auth)/(login)/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <PublicLayout>
      <Center className={classes.root}>
        <Stack justify="center">
          <Button leftSection={<IconBrandGoogleFilled />} onClick={() => signIn("google")} >Login With Google</Button>
          <Button leftSection={<IconBrandGithubFilled />} onClick={() => signIn("github")} >Login With Github</Button>
        </Stack>
      </Center>
    </PublicLayout>
  );
}
