export const adminProviderIds = ["google", "microsoft-entra-id"] as const;

export type AdminProviderId = (typeof adminProviderIds)[number];

type AdminAuthEnvironment = Partial<
  Record<
    | "AUTH_SECRET"
    | "AUTH_GOOGLE_ID"
    | "AUTH_GOOGLE_SECRET"
    | "AUTH_MICROSOFT_ENTRA_ID_ID"
    | "AUTH_MICROSOFT_ENTRA_ID_SECRET"
    | "AUTH_MICROSOFT_ENTRA_ID_ISSUER"
    | "ADMIN_EMAILS"
    | "ADMIN_MICROSOFT_OBJECT_IDS",
    string | undefined
  >
>;

export type AdminIdentity = {
  provider: AdminProviderId;
  subject: string;
  email: string | null;
};

type AdminIdentityCandidate = {
  provider: string | null | undefined;
  email?: string | null;
  emailVerified?: boolean;
  microsoftObjectId?: string | null;
};

function parseAllowlist(value: string | undefined) {
  return [...new Set((value ?? "").split(/[\n,]+/).map((entry) => entry.trim().toLowerCase()).filter(Boolean))];
}

export function normalizeAdminEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

export function getAdminAuthConfiguration(environment: AdminAuthEnvironment = process.env as AdminAuthEnvironment) {
  const adminEmails = parseAllowlist(environment.ADMIN_EMAILS);
  const microsoftObjectIds = parseAllowlist(environment.ADMIN_MICROSOFT_OBJECT_IDS);
  const googleCredentialsConfigured = Boolean(environment.AUTH_GOOGLE_ID && environment.AUTH_GOOGLE_SECRET);
  const microsoftCredentialsConfigured = Boolean(
    environment.AUTH_MICROSOFT_ENTRA_ID_ID &&
      environment.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
      environment.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
  );
  const googleEnabled = googleCredentialsConfigured && adminEmails.length > 0;
  const microsoftEnabled = microsoftCredentialsConfigured && microsoftObjectIds.length > 0;

  return {
    secretConfigured: Boolean(environment.AUTH_SECRET),
    adminEmails,
    microsoftObjectIds,
    google: {
      credentialsConfigured: googleCredentialsConfigured,
      enabled: googleEnabled,
    },
    microsoft: {
      credentialsConfigured: microsoftCredentialsConfigured,
      enabled: microsoftEnabled,
    },
    enabledProviders: [
      ...(googleEnabled ? (["google"] as const) : []),
      ...(microsoftEnabled ? (["microsoft-entra-id"] as const) : []),
    ],
    isConfigured: Boolean(environment.AUTH_SECRET && (googleEnabled || microsoftEnabled)),
  };
}

export function resolveAllowedAdminIdentity(
  candidate: AdminIdentityCandidate,
  environment: AdminAuthEnvironment = process.env as AdminAuthEnvironment,
): AdminIdentity | null {
  const configuration = getAdminAuthConfiguration(environment);

  if (candidate.provider === "google") {
    const email = normalizeAdminEmail(candidate.email);

    if (!configuration.google.enabled || candidate.emailVerified !== true || !configuration.adminEmails.includes(email)) {
      return null;
    }

    return {
      provider: "google",
      subject: email,
      email,
    };
  }

  if (candidate.provider === "microsoft-entra-id") {
    const objectId = candidate.microsoftObjectId?.trim().toLowerCase() ?? "";

    if (!configuration.microsoft.enabled || !configuration.microsoftObjectIds.includes(objectId)) {
      return null;
    }

    return {
      provider: "microsoft-entra-id",
      subject: objectId,
      email: normalizeAdminEmail(candidate.email) || null,
    };
  }

  return null;
}

export function isAllowedAdminSession(
  identity: Pick<AdminIdentity, "provider" | "subject"> | null | undefined,
  environment: AdminAuthEnvironment = process.env as AdminAuthEnvironment,
) {
  if (!identity?.subject) return false;

  const configuration = getAdminAuthConfiguration(environment);
  const subject = identity.subject.trim().toLowerCase();

  if (identity.provider === "google") {
    return configuration.google.enabled && configuration.adminEmails.includes(subject);
  }

  if (identity.provider === "microsoft-entra-id") {
    return configuration.microsoft.enabled && configuration.microsoftObjectIds.includes(subject);
  }

  return false;
}

export function sanitizeAdminCallbackPath(value: string | null | undefined) {
  if (!value || value === "/admin/sign-in") return "/admin/products";

  if (value === "/admin" || value.startsWith("/admin/")) {
    return value;
  }

  return "/admin/products";
}
