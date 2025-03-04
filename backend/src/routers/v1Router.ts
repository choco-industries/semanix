import { Hono } from "hono";
import authRouter from "./v1/authRouter";
import whatsappRouter from "./v1/whatsappRouter";
import { verifyAuth } from "@hono/auth-js";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { initAuthConfig } from "@hono/auth-js";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "@/schema";

const v1Router = new Hono()
  .use(
    "*",
    initAuthConfig((c) => ({
      adapter: DrizzleAdapter(c.get("db"), {
        usersTable: users,
        accountsTable: accounts,
        authenticatorsTable: authenticators,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      }),
      secret: Bun.env.AUTH_SECRET,
      providers: [
        GitHub({
          clientId: Bun.env.GITHUB_ID,
          clientSecret: Bun.env.GITHUB_SECRET,
        }),
        Google({
          clientId: Bun.env.GOOGLE_ID,
          clientSecret: Bun.env.GOOGLE_SECRET,
        }),
        //     Credentials({
        //       credentials: {
        //         email: {},
        //         password: {},
        //       },
        //       async authorize(credentials, request) {
        //         if (!credentials?.email || !credentials?.password) {
        //           throw new CredentialsSignin("Email and Password are required");
        //         }

        //         const [foundUsers, error] = await tryPromise(
        //           db
        //             .select()
        //             .from(users)
        //             .where(eq(users.email, credentials.email as string))
        //             .limit(1)
        //         );

        //         if (error) {
        //           throw new CredentialsSignin(error?.message);
        //         }

        //         if (foundUsers.length === 0) {
        //           throw new CredentialsSignin("User not found");
        //         }

        //         const user = foundUsers[0];

        //         if (!user.password) {
        //           throw new CredentialsSignin(
        //             `You have Signed Up with a Different authentication method try using that method`
        //           );
        //         }

        //         if (user.emailVerified === null) {
        //           throw new CredentialsSignin(
        //             "Please verify your account before login"
        //           );
        //         }

        //         const [passwordMatch, passwordMatchError] = await tryPromise(
        //           comparePassword(credentials.password as string, user.password)
        //         );

        //         if (passwordMatchError) {
        //           throw new CredentialsSignin(passwordMatchError?.message);
        //         }

        //         if (!passwordMatch) {
        //           throw new CredentialsSignin("Incorrect Password");
        //         }

        //         return user;
        //       },
        //     }),
      ],
      session: {
        strategy: "jwt",
      },
      callbacks: {
        async jwt({ token, trigger }) {
          if (trigger === "signUp") {
            // New User can be done something
          }
          return token;
        },
        async session({ session }) {
          return session;
        },
      },
    }))
  )
  .use("*", verifyAuth())
  .route("/auth", authRouter)
  .route("/whatsapp", whatsappRouter);

export default v1Router;
