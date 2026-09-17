// Équipe réelle (noms/rôles issus de la maquette site/index.html, page À propos).
// avatarUrl reste vide tant que les portraits ne sont pas fournis (cf. LISEZ-MOI.txt) —
// gérable depuis le dashboard admin une fois Supabase Storage branché.

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  avatarUrl: string | null;
};

export const TEAM: TeamMember[] = [
  { slug: "boris", name: "Boris", role: "Fondateur et Associé", avatarUrl: null },
  { slug: "armel", name: "Armel", role: "Architecte Associé", avatarUrl: null },
  { slug: "mohammed", name: "Mohammed", role: "Dessinateur CAO, DAO", avatarUrl: null },
  { slug: "ida", name: "Ida", role: "Technicienne Supérieure Bâtiment", avatarUrl: null },
  { slug: "etilyne", name: "Etilyne", role: "Assistante Administrative", avatarUrl: null },
  { slug: "elfisio", name: "Elfisio", role: "Technicien Supérieur Bâtiment", avatarUrl: null },
  { slug: "hidaayath", name: "Hidaayath", role: "Architecte, Cheffe Projet", avatarUrl: null },
  { slug: "behidi", name: "Behidi", role: "Architecte", avatarUrl: null },
  { slug: "julio", name: "Julio", role: "Architecte", avatarUrl: null },
  { slug: "issiaka", name: "Issiaka", role: "Technicien Supérieur", avatarUrl: null },
  { slug: "david", name: "David", role: "Technicien Supérieur Bâtiment", avatarUrl: null },
];
