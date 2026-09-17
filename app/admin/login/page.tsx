import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Connexion — OBA Architectes Firm" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg px-6">
      <div className="w-full max-w-[380px] rounded-lg bg-admin-sidebar p-8">
        <Image src="/assets/logo-oba-clair.png" alt="OBA Architectes Firm" width={120} height={57} className="mb-6" />
        <h1 className="font-display m-0 mb-1 text-2xl text-admin-text">Espace d&apos;administration</h1>
        <p className="m-0 mb-7 text-sm text-admin-muted">Connectez-vous pour gérer le site.</p>
        <LoginForm />
      </div>
    </div>
  );
}
