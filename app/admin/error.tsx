"use client";

import { primaryButtonClass } from "@/components/admin/ui";

/**
 * There was no error boundary anywhere in the app before this — an uncaught
 * exception in a Server Action (e.g. a request rejected before it even
 * reaches our code, like Next's Server Action body-size cap) surfaced as
 * nothing at all: no message, no crash, just a page that looked unchanged.
 * This at least turns that into a visible, actionable message.
 */
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center gap-4 p-8">
      <h1 className="font-display m-0 text-2xl">Une erreur est survenue</h1>
      <p className="m-0 max-w-xl text-admin-muted">{error.message || "Erreur inconnue."}</p>
      <button type="button" onClick={reset} className={primaryButtonClass}>
        Réessayer
      </button>
    </div>
  );
}
