"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "./actions";

const NATURES = ["Architecture", "Architecture intérieure", "Urbanisme", "Paysagisme", "Suivi de projets"];

const fieldLabel = "font-mono text-sm tracking-[.18em] uppercase";
const fieldInput = "border-0 border-b bg-transparent py-2.75 text-lg outline-none transition-colors focus:border-[var(--ac)]";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="grid grid-cols-2 gap-[clamp(20px,2.6vw,34px)] max-[640px]:grid-cols-1">
      <label className="flex flex-col gap-2.25">
        <span className={fieldLabel} style={{ color: "var(--pl)" }}>
          Nom et prénom
        </span>
        <input name="nom" type="text" required className={fieldInput} style={{ borderColor: "rgba(var(--plr),.26)", color: "var(--pl)" }} />
      </label>
      <label className="flex flex-col gap-2.25">
        <span className={fieldLabel} style={{ color: "var(--pl)" }}>
          Société
        </span>
        <input name="societe" type="text" className={fieldInput} style={{ borderColor: "rgba(var(--plr),.26)", color: "var(--pl)" }} />
      </label>
      <label className="flex flex-col gap-2.25">
        <span className={fieldLabel} style={{ color: "var(--pl)" }}>
          Courriel
        </span>
        <input name="email" type="email" required className={fieldInput} style={{ borderColor: "rgba(var(--plr),.26)", color: "var(--pl)" }} />
      </label>
      <label className="flex flex-col gap-2.25">
        <span className={fieldLabel} style={{ color: "var(--pl)" }}>
          Téléphone
        </span>
        <input name="telephone" type="tel" className={fieldInput} style={{ borderColor: "rgba(var(--plr),.26)", color: "var(--pl)" }} />
      </label>
      <label className="col-span-2 flex flex-col gap-2.25">
        <span className={fieldLabel} style={{ color: "var(--pl)" }}>
          Nature du projet
        </span>
        <select
          name="nature_projet"
          className={fieldInput}
          style={{ borderColor: "rgba(var(--plr),.26)", color: "var(--pl)", background: "var(--nk3)" }}
        >
          {NATURES.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </label>
      <label className="col-span-2 flex flex-col gap-2.25">
        <span className={fieldLabel} style={{ color: "var(--pl)" }}>
          Votre message
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className={`${fieldInput} resize-y`}
          style={{ borderColor: "rgba(var(--plr),.26)", color: "var(--pl)" }}
        />
      </label>
      <div className="col-span-2 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-4 rounded-full border px-8.5 py-4.75 font-mono text-[15px] tracking-[.16em] uppercase transition-colors hover:bg-[#EF8B12] hover:text-[#100F0C] disabled:opacity-50"
          style={{ borderColor: "rgba(var(--plr),.34)" }}
        >
          {pending ? "Envoi…" : "Envoyer"}
          <span className="block h-px w-8.5 bg-current" />
        </button>
        <span className="font-mono text-[14.5px]" style={{ color: state.success ? "var(--ac)" : "#e5484d" }}>
          {state.success ? "Message transmis — nous revenons vers vous rapidement." : state.error}
        </span>
      </div>
    </form>
  );
}
