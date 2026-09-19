import "server-only";
import { cookies } from "next/headers";

const FLASH_COOKIE = "oba-admin-flash";

/**
 * Queues a one-shot success message for the admin dashboard's toast
 * (components/admin/FlashToast.tsx). Call from a Server Action right before
 * its revalidatePath/redirect — the dashboard layout reads the cookie on the
 * next render (the same one the action's revalidation triggers) and hands it
 * to the toast, which clears the cookie itself once shown.
 *
 * The random prefix means two saves with the identical message in a row
 * still each produce a fresh cookie value, so the toast's effect (keyed on
 * that value) fires again instead of no-op'ing on an "unchanged" prop.
 */
export async function flash(message: string) {
  const store = await cookies();
  store.set(FLASH_COOKIE, `${crypto.randomUUID()}|${message}`, { path: "/admin", maxAge: 10 });
}

/** Server Components can only read cookies, not clear them — the client-side
 *  FlashToast is what actually deletes this cookie after displaying it. */
export async function readFlash(): Promise<string | null> {
  const store = await cookies();
  return store.get(FLASH_COOKIE)?.value ?? null;
}
