import type { DefaultSession } from "next-auth";
import type { AdminProviderId } from "@/lib/admin-authorization";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      adminProvider?: AdminProviderId;
      adminSubject?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    adminProvider?: AdminProviderId;
    adminSubject?: string;
  }
}
