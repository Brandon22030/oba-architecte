"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { uploadIdle, type UploadState } from "@/lib/admin/upload-state";
import { secondaryButtonClass } from "./ui";

type UploadFieldProps = {
  action: (prevState: UploadState, formData: FormData) => Promise<UploadState>;
  /** The currently persisted image, if any — shown until a new upload succeeds. */
  currentUrl: string | null;
  /** Used for the <Image> alt text and the empty-state placeholder caption. */
  label: string;
  accept?: string;
  hint?: string;
  /** "portrait" shows a large boxed preview above the controls (avatars, GM photo).
   *  "compact" is a single row, meant to sit inside an already-illustrated context (galleries). */
  variant?: "portrait" | "compact";
};

/**
 * Upload button used across the admin dashboard (team avatars, GM photo,
 * project/actualité galleries). Shows an immediate local preview of the
 * picked file (before it's actually saved) and surfaces upload failures
 * inline — the previous plain <input type="file"> + button gave zero
 * feedback either way, which is why a failed upload used to look identical
 * to a successful one until the next reload.
 */
export function UploadField({ action, currentUrl, label, accept = "image/jpeg,image/png,image/webp", hint, variant = "portrait" }: UploadFieldProps) {
  const [state, formAction, pending] = useActionState(action, uploadIdle);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The persisted URL changed (upload succeeded) — drop the local preview so
  // we go back to showing server truth instead of a stale blob. Adjusting
  // state during render (React's documented pattern for this) rather than in
  // an effect avoids an extra commit with stale preview data.
  const [trackedUrl, setTrackedUrl] = useState(currentUrl);
  if (currentUrl !== trackedUrl) {
    setTrackedUrl(currentUrl);
    setPreview(null);
    setFileName(null);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const shown = preview ?? currentUrl;

  const controls = (
    <form action={formAction} className="flex flex-wrap items-center gap-2.5">
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept={accept}
        required
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setFileName(file.name);
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file);
          });
        }}
      />
      <button type="button" onClick={() => inputRef.current?.click()} className={`${secondaryButtonClass} px-3 py-1.5 text-xs`}>
        Choisir un fichier
      </button>
      <span className="min-w-0 flex-1 truncate text-xs text-admin-muted">{fileName ?? "Aucun fichier choisi"}</span>
      <button type="submit" disabled={pending || !fileName} className={`${secondaryButtonClass} px-3 py-1.5 text-xs`}>
        {pending ? "Envoi…" : "Verser"}
      </button>
    </form>
  );

  const feedback = state.error ? (
    <p className="m-0 text-xs text-[#b3261e]">Échec de l&apos;envoi : {state.error}</p>
  ) : hint ? (
    <p className="m-0 text-xs text-admin-muted">{hint}</p>
  ) : null;

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-2">
        {preview && (
          <div className="relative aspect-3/2 w-28 overflow-hidden rounded">
            {/* Local blob preview only — next/image can't optimize blob: URLs. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}
        {controls}
        {feedback}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-3/4 w-40 overflow-hidden rounded bg-admin-sidebar">
        {shown ? (
          preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Image src={shown} alt={label} fill className="object-cover" />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-xs text-admin-muted">Portrait à venir</div>
        )}
        {preview && (
          <span className="absolute top-1.5 left-1.5 rounded bg-black/60 px-1.5 py-1 font-mono text-[9px] tracking-[.06em] text-white uppercase">
            Aperçu — pas encore enregistré
          </span>
        )}
      </div>
      {controls}
      {feedback}
    </div>
  );
}
