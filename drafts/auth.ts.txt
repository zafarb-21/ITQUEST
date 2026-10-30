import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import {
  getAdminAuthConfiguration,
  resolveAllowedAdminIdentity,
} from "@/lib/admin-authorization";

const configuration = getAdminAuthConfiguration();
const providers: Provider[] = [];

if (configuration.google.enabled) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  );
}

if (configuration.microsoft.enabled) {
  providers.push(
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
    }),
  );
}

function identityFromOAuth({
  provider,
  profile,
  fallbackEmail,
}: {
  provider: string | null | undefined;
  profile: Record<string, unknown> | undefined;
  fallbackEmail: string | null | undefined;
}) {
  return resolveAllowedAdminIdentity({
    provider,
    email: typeof profile?.email === "string" ? profile.email : fallbackEmail,
    emailVerified: profile?.email_verified === true,
    microsoftObjectId: typeof profile?.oid === "string" ? profile.oid : null,
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers,
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: "/admin/sign-in",
    error: "/admin/sign-in",
  },
  callbacks: {
    signIn({ account, profile, user }) {
      return Boolean(
        identityFromOAuth({
          provider: account?.provider,
          profile,
          fallbackEmail: user.email,
        }),
      );
    },
    jwt({ token, account, profile, user }) {
      if (account) {
        const identity = identityFromOAuth({
          provider: account.provider,
          profile,
          fallbackEmail: user?.email,
        });

        token.adminProvider = identity?.provider;
        token.adminSubject = identity?.subject;
      }

      return token;
    },
    session({ session, token }) {
      session.user.adminProvider =
        token.adminProvider === "google" || token.adminProvider === "microsoft-entra-id"
          ? token.adminProvider
          : undefined;
      session.user.adminSubject = typeof token.adminSubject === "string" ? token.adminSubject : undefined;
      return session;
    },
  },
});
