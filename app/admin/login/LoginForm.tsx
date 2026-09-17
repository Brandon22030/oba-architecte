"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[.14em] uppercase text-admin-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none focus:border-admin-accent"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[.14em] uppercase text-admin-muted">Mot de passe</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none focus:border-admin-accent"
        />
      </label>
      {state.error && <p className="m-0 text-sm text-[#b3261e]">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-admin-text px-4 py-2.75 font-medium text-admin-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
