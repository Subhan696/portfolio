"use client";

import { siteConfig } from "@/lib/site";

/**
 * Bypasses the OS mailto handler (which on Windows often opens the Chrome
 * profile picker when no default mail client is configured) and opens
 * Gmail's web compose window directly with the recipient pre-filled.
 */
export function useEmail() {
  const compose = (subject?: string, body?: string) => {
    const url = new URL("https://mail.google.com/mail/");
    url.searchParams.set("view", "cm");
    url.searchParams.set("fs", "1");
    url.searchParams.set("to", siteConfig.email);
    if (subject) url.searchParams.set("su", subject);
    if (body) url.searchParams.set("body", body);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return { compose, email: siteConfig.email };
}
