import assert from "node:assert/strict";
import test from "node:test";
import {
  getAdminAuthConfiguration,
  isAllowedAdminSession,
  resolveAllowedAdminIdentity,
  sanitizeAdminCallbackPath,
} from "../lib/admin-authorization";

const googleEnvironment = {
  AUTH_SECRET: "test-secret",
  AUTH_GOOGLE_ID: "google-client",
  AUTH_GOOGLE_SECRET: "google-secret",
  ADMIN_EMAILS: " Admin@One.Example,second@example.com\nadmin@one.example ",
};

test("Google auth requires complete credentials, a secret, and an email allowlist", () => {
  const configuration = getAdminAuthConfiguration(googleEnvironment);

  assert.equal(configuration.isConfigured, true);
  assert.deepEqual(configuration.adminEmails, ["admin@one.example", "second@example.com"]);
  assert.deepEqual(configuration.enabledProviders, ["google"]);
  assert.equal(
    getAdminAuthConfiguration({ ...googleEnvironment, AUTH_GOOGLE_SECRET: undefined }).isConfigured,
    false,
  );
});

test("Google identities require a verified, exact allowlisted email", () => {
  assert.deepEqual(
    resolveAllowedAdminIdentity(
      {
        provider: "google",
        email: "ADMIN@ONE.EXAMPLE",
        emailVerified: true,
      },
      googleEnvironment,
    ),
    {
      provider: "google",
      subject: "admin@one.example",
      email: "admin@one.example",
    },
  );

  assert.equal(
    resolveAllowedAdminIdentity(
      { provider: "google", email: "admin@one.example", emailVerified: false },
      googleEnvironment,
    ),
    null,
  );
  assert.equal(
    resolveAllowedAdminIdentity(
      { provider: "google", email: "attacker@one.example", emailVerified: true },
      googleEnvironment,
    ),
    null,
  );
});

test("Microsoft identities use immutable object IDs instead of mutable email claims", () => {
  const environment = {
    AUTH_SECRET: "test-secret",
    AUTH_MICROSOFT_ENTRA_ID_ID: "microsoft-client",
    AUTH_MICROSOFT_ENTRA_ID_SECRET: "microsoft-secret",
    AUTH_MICROSOFT_ENTRA_ID_ISSUER: "https://login.microsoftonline.com/tenant-id/v2.0",
    ADMIN_MICROSOFT_OBJECT_IDS: "11111111-2222-3333-4444-555555555555",
  };

  assert.deepEqual(
    resolveAllowedAdminIdentity(
      {
        provider: "microsoft-entra-id",
        email: "admin@example.com",
        microsoftObjectId: "11111111-2222-3333-4444-555555555555",
      },
      environment,
    ),
    {
      provider: "microsoft-entra-id",
      subject: "11111111-2222-3333-4444-555555555555",
      email: "admin@example.com",
    },
  );
  assert.equal(
    resolveAllowedAdminIdentity(
      {
        provider: "microsoft-entra-id",
        email: "admin@example.com",
        microsoftObjectId: "different-object-id",
      },
      environment,
    ),
    null,
  );
});

test("Every session check re-applies the current allowlist", () => {
  assert.equal(
    isAllowedAdminSession(
      { provider: "google", subject: "admin@one.example" },
      googleEnvironment,
    ),
    true,
  );
  assert.equal(
    isAllowedAdminSession(
      { provider: "google", subject: "admin@one.example" },
      { ...googleEnvironment, ADMIN_EMAILS: "second@example.com" },
    ),
    false,
  );
});

test("Admin callback paths cannot redirect outside the admin area", () => {
  assert.equal(sanitizeAdminCallbackPath("/admin/products"), "/admin/products");
  assert.equal(sanitizeAdminCallbackPath("/admin"), "/admin");
  assert.equal(sanitizeAdminCallbackPath("https://attacker.example"), "/admin/products");
  assert.equal(sanitizeAdminCallbackPath("//attacker.example/admin"), "/admin/products");
  assert.equal(sanitizeAdminCallbackPath("/products"), "/admin/products");
});
