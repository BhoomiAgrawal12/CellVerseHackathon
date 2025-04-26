import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "PATIENT" | "ADMIN" | "DOCTOR";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    // {
    //   id: string;
    //   role: Role;
    // } & DefaultSession["user"];
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "PATIENT" | "ADMIN" | "DOCTOR";
  }
}
