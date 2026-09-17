// Types et constantes partagés entre client et serveur — pas d'import
// "server-only" ici, contrairement à lib/data/projects.ts (qui interroge
// Supabase). Un Client Component ne doit importer QUE ce fichier.

export type ProjectStatut = "Livré" | "En chantier" | "Concours lauréat" | "Étude";

export type ProjectImage = { id: string; url: string; alt: string | null; sortOrder: number };

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  famille: string;
  villeId: string | null;
  city: string;
  maitreOuvrage: string | null;
  mission: string | null;
  missionScope: string | null;
  statut: ProjectStatut;
  publie: boolean;
  featuredHomePosition: number | null;
  chapo: string | null;
  description: string | null;
  coverImageUrl: string | null;
};

export const CATEGORIES = [
  "Tout",
  "Culture",
  "Urbanisme",
  "Hôtellerie",
  "Loisirs",
  "Industrie",
  "Institution",
  "Tertiaire",
  "Réseaux",
  "Résidentiel",
] as const;
