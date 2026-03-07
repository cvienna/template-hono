import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "./db";
import * as authSchema from "@/features/auth/auth.schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...authSchema },
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60,
    cookieCache: {
      enabled: false,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI()],
});
