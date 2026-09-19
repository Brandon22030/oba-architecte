// Types et constantes partagés entre client et serveur — pas d'import
// "server-only" ici, contrairement à lib/data/actualites.ts (qui interroge
// Supabase). Un Client Component ne doit importer QUE ce fichier.

export type ActualiteBlock = { type: "titre" | "paragraphe"; texte: string };

export type ActualiteImage = { id: string; url: string; alt: string | null; sortOrder: number };

export type Actualite = {
  id: string;
  slug: string;
  titre: string;
  categorie: string;
  datePublication: string; // ISO date (yyyy-mm-dd)
  extrait: string | null;
  sujet: string | null;
  corps: ActualiteBlock[];
  coverImageUrl: string | null;
  publie: boolean;
};

export const CATEGORIES_ACTUALITE = ["Tout", "Presse", "News"] as const;

/** "13 décembre 2019" — cohérent quelle que soit la précision saisie côté admin. */
export function formatDateActualite(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Sérialise les blocs en texte pour le textarea admin : une ligne "## " = sous-titre, sinon paragraphe. */
export function corpsToText(corps: ActualiteBlock[]): string {
  return corps.map((b) => (b.type === "titre" ? `## ${b.texte}` : b.texte)).join("\n\n");
}

/** Relit le texte du textarea admin vers la structure de blocs. */
export function textToCorps(text: string): ActualiteBlock[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block.startsWith("## ") ? { type: "titre" as const, texte: block.slice(3).trim() } : { type: "paragraphe" as const, texte: block },
    );
}
