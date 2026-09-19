// Shared return shape for upload server actions (components/admin/UploadField.tsx
// drives them via useActionState) — returning an error instead of throwing means
// a failed upload shows a message right in the panel instead of vanishing
// silently (there's no app/error.tsx boundary to catch a thrown one).
export type UploadState = { error: string | null };

export const uploadIdle: UploadState = { error: null };
