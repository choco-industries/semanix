import { google } from "googleapis";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { accounts, users } from "@/schema";
import { and, eq } from "drizzle-orm";

async function getMails(userId: string) {
  const oauth2Client = new google.auth.OAuth2(
    Bun.env.GOOGLE_ID,
    Bun.env.GOOGLE_SECRET
  );

  const sqlite = new Database("sqlite.db");
  const db = drizzle({ client: sqlite });

  const userAndAccountOrUndefined = (
    await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .leftJoin(
        accounts,
        and(eq(accounts.userId, userId), eq(accounts.provider, "google"))
      )
      .limit(1)
  ).at(0);

  if (!userAndAccountOrUndefined || !userAndAccountOrUndefined.account) {
    console.log("No User was found");
    return;
  }

  const { user, account } = userAndAccountOrUndefined;

  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    id_token: account.id_token,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });
  return await gmail.users.messages.list({
    userId: userId,
  });
}

// const mails = await getMails("a8986979-ae5d-4006-9e5b-14f9376ef88d");

// console.log(mails);
