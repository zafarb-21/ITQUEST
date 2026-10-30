import type { Metadata } from "next";
import { Building2, KeyRound, LockKeyhole, ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { getCurrentAdmin } from "@/lib/admin-auth";
import {
  getAdminAuthConfiguration,
  sanitizeAdminCallbackPath,
} from "@/lib/admin-authorization";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Secure access to ITQUEST AFRICA catalog administration.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

type AdminSignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function errorMessage(error: string | undefined) {
  if (error === "Configuration") {
    return "Admin authentication is not fully configured yet.";
  }

  if (error === "AccessDenied") {
    return "This account is authenticated but is not approved for admin access.";
  }

  if (error) {
    return "Sign-in could not be completed. Check the provider configuration and try again.";
  }

  return null;
}

export default async function AdminSignInPage({ searchParams }: AdminSignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const callbackPath = sanitizeAdminCallbackPath(firstSearchParam(resolvedSearchParams.callbackUrl));
  const error = errorMessage(firstSearchParam(resolvedSearchParams.error));
  const configuration = getAdminAuthConfiguration();
  const currentAdmin = await getCurrentAdmin();

  if (currentAdmin) {
    redirect(callbackPath);
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(14,116,144,0.2),transparent_32%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
          <BrandMark size="compact" />
          <div className="mt-10 inline-flex rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-cyan-300">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Restricted Access</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Catalog administration</h1>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Sign in with an approved company identity to manage products, pricing, categories, and inventory.
          </p>

          {error ? (
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-4 text-sm leading-6 text-amber-100">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          {configuration.isConfigured ? (
            <div className="mt-8 space-y-3">
              {configuration.google.enabled ? (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: callbackPath });
                  }}
                >
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  >
                    <KeyRound className="h-5 w-5 text-brand-700" />
                    Continue with Google
                  </button>
                </form>
              ) : null}

              {configuration.microsoft.enabled ? (
                <form
                  action={async () => {
                    "use server";
                    await signIn("microsoft-entra-id", { redirectTo: callbackPath });
                  }}
                >
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.1]"
                  >
                    <Building2 className="h-5 w-5 text-cyan-300" />
                    Continue with Microsoft
                  </button>
                </form>
              ) : null}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 px-5 py-5">
              <p className="text-sm font-semibold text-white">Setup required</p>
              <p className="mt-2 text-sm leading-7 text-white/60">
                Configure <code className="text-cyan-300">AUTH_SECRET</code>, one OAuth provider, and its admin allowlist before this page can accept sign-ins.
              </p>
            </div>
          )}

          <p className="mt-8 text-xs leading-6 text-white/40">
            Access attempts are limited to identities explicitly approved in the server environment.
          </p>
        </div>
      </Container>
    </section>
  );
}
