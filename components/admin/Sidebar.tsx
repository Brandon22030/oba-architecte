"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/(dashboard)/actions";

const LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/projets", label: "Projets" },
  { href: "/admin/equipe", label: "Équipe" },
  { href: "/admin/demandes", label: "Demandes de contact" },
  { href: "/admin/reglages", label: "Réglages" },
];

export function Sidebar({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col justify-between border-r border-[#3a3733]/10 bg-admin-sidebar p-6">
      <div>
        <Image src="/assets/logo-oba-clair.png" alt="OBA Architectes Firm" width={110} height={53} className="mb-2" />
        <p className="mt-4 mb-6 font-mono text-xs tracking-[.14em] uppercase text-admin-muted">
          Espace d&apos;administration
        </p>
        <nav className="flex flex-col gap-1">
          {LINKS.map((link) => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-2.5 text-sm font-medium transition-colors"
                style={{
                  background: active ? "rgba(58,55,51,.08)" : "transparent",
                  color: "#3A3733",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[#3a3733]/10 pt-5">
        {userEmail && <p className="m-0 mb-3 truncate text-xs text-admin-muted">{userEmail}</p>}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mb-2 block text-sm font-medium text-admin-accent hover:underline"
        >
          Voir le site public
        </a>
        <form action={signOut}>
          <button type="submit" className="text-sm text-admin-muted hover:text-admin-text">
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
