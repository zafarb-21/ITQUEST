import "server-only";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getAdminAuthConfiguration,
  isAllowedAdminSession,
  sanitizeAdminCallbackPath,
} from "@/lib/admin-authorization";

function sessionHasAdminAccess(session: Session | null) {
  return isAllowedAdminSession(
    session?.user.adminProvider && session.user.adminSubject
      ? {
          provider: session.user.adminProvider,
          subject: session.user.adminSubject,
        }
      : null,
  );
}

export async function getCurrentAdmin() {
  const configuration = getAdminAuthConfiguration();
  if (!configuration.isConfigured) return null;

  const session = await auth();
  if (!sessionHasAdminAccess(session)) return null;

  return {
    name: session!.user.name ?? "Administrator",
    email: session!.user.email ?? "Authorized account",
  };
}

export async function requireAdminPage(callbackPath = "/admin/products") {
  const safeCallbackPath = sanitizeAdminCallbackPath(callbackPath);
  const configuration = getAdminAuthConfiguration();

  if (!configuration.isConfigured) {
    redirect(
      "/admin/sign-in?error=Configuration&callbackUrl=" +
        encodeURIComponent(safeCallbackPath),
    );
  }

  const session = await auth();

  if (!session) {
    redirect("/admin/sign-in?callbackUrl=" + encodeURIComponent(safeCallbackPath));
  }

  if (!sessionHasAdminAccess(session)) {
    redirect(
      "/admin/sign-in?error=AccessDenied&callbackUrl=" +
        encodeURIComponent(safeCallbackPath),
    );
  }

  return {
    name: session.user.name ?? "Administrator",
    email: session.user.email ?? "Authorized account",
  };
}

export async function authorizeAdminApiRequest() {
  const configuration = getAdminAuthConfiguration();

  if (!configuration.isConfigured) {
    return NextResponse.json(
      { ok: false, message: "Admin authentication is not configured." },
      { status: 503 },
    );
  }

  const session = await auth();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Authentication required." }, { status: 401 });
  }

  if (!sessionHasAdminAccess(session)) {
    return NextResponse.json({ ok: false, message: "Admin access required." }, { status: 403 });
  }

  return null;
}
