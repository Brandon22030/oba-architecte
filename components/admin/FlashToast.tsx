"use client";

import { useEffect, useState } from "react";

/**
 * Shows a brief "Enregistrement réussi" toast after any dashboard save —
 * driven by a cookie a Server Action sets right before it revalidates (see
 * lib/admin/flash.ts). Every admin form uses a plain <form action={fn}>
 * without client-side state, so this cookie relay is what lets a server
 * action's outcome surface as UI feedback without rewiring every action to
 * useActionState just for a success message.
 */
export function FlashToast({ raw }: { raw: string | null }) {
  const [trackedRaw, setTrackedRaw] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string | null>(null);

  // A new flash value arrived — show it immediately (adjusting state during
  // render, React's documented pattern for this, avoids an extra commit).
  if (raw && raw !== trackedRaw) {
    setTrackedRaw(raw);
    const separator = raw.indexOf("|");
    setText(separator === -1 ? raw : raw.slice(separator + 1));
    setVisible(true);
  }

  // The timer and cookie clear are genuine effects (external systems), kept
  // separate from the state update above.
  useEffect(() => {
    if (!raw) return;
    document.cookie = "oba-admin-flash=; Max-Age=0; path=/admin";

    const hide = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(hide);
  }, [raw]);

  if (!text) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-6 bottom-6 z-200 flex items-center gap-2.5 rounded-lg bg-admin-text px-4 py-3 text-sm font-medium text-admin-bg shadow-lg transition-all duration-500 ease-[cubic-bezier(.18,.8,.24,1)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0"
      }`}
    >
      <span aria-hidden="true" className="text-admin-accent">
        ✓
      </span>
      {text}
    </div>
  );
}
