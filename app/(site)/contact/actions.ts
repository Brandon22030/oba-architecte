"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactFormState = { success: boolean; error?: string };

function field(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

export async function submitContact(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const nom = field(formData, "nom");
  const email = field(formData, "email");
  const message = field(formData, "message");

  if (!nom || !email || !message) {
    return { success: false, error: "Merci de renseigner au moins votre nom, votre courriel et votre message." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_requests").insert({
    nom,
    societe: field(formData, "societe"),
    email,
    telephone: field(formData, "telephone"),
    nature_projet: field(formData, "nature_projet"),
    message,
  });

  if (error) {
    return { success: false, error: "Une erreur est survenue — merci de réessayer ou de nous écrire directement." };
  }

  return { success: true };
}
