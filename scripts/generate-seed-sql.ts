// Génère supabase/seed.sql à partir des données de seed TypeScript
// (lib/data/*.ts), pour éviter toute retranscription manuelle divergente.
// Usage : npx tsx scripts/generate-seed-sql.ts > supabase/seed.sql

import { ACTUALITES } from "../lib/data/seed/actualites.seed";
import { PROJECTS } from "../lib/data/seed/projects.seed";
import { TEAM } from "../lib/data/seed/team.seed";
import { VILLES } from "../lib/data/seed/villes.seed";
import { texteDemo } from "../lib/data/text";

function sql(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  return `'${value.replace(/'/g, "''")}'`;
}

const img = (stem: string) => `/assets/img/${stem}.jpg`;
const VILLE_NAMES = new Set(VILLES.map((v) => v.nom));
const villeIdRef = (city: string) =>
  VILLE_NAMES.has(city) ? `(select id from villes where nom = ${sql(city)})` : "null";

const lines: string[] = [];
lines.push("-- Données de départ — générées depuis lib/data/*.ts par scripts/generate-seed-sql.ts");
lines.push("-- Ne pas éditer à la main : relancer `npx tsx scripts/generate-seed-sql.ts > supabase/seed.sql`.");
lines.push("");

// --- villes ---------------------------------------------------------------
lines.push("insert into villes (nom, lat, lon, sort_order) values");
lines.push(
  VILLES.map((v, i) => `  (${sql(v.nom)}, ${v.lat}, ${v.lon}, ${i})`).join(",\n") +
    "\non conflict (nom) do update set lat = excluded.lat, lon = excluded.lon, sort_order = excluded.sort_order;",
);
lines.push("");

// --- team_members -----------------------------------------------------------
lines.push("insert into team_members (name, role, sort_order) values");
lines.push(
  TEAM.map((m, i) => `  (${sql(m.name)}, ${sql(m.role)}, ${i})`).join(",\n") +
    "\non conflict (name) do update set role = excluded.role, sort_order = excluded.sort_order;",
);
lines.push("");

// --- projects + project_images ---------------------------------------------
lines.push("-- Projets : un bloc par fiche (insert du projet, puis de sa galerie via son slug).");
PROJECTS.forEach((p, i) => {
  const { chapo } = texteDemo(p);
  lines.push(`insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (`);
  lines.push(`  ${sql(p.slug)}, ${sql(p.title)}, ${sql(p.category)}, ${sql(p.famille)}, ${villeIdRef(p.city)}, ${sql(p.city)}, ${sql(p.maitreOuvrage)}, ${sql(p.mission)}, ${sql(p.missionScope)}, ${sql(p.statut)}, ${sql(p.publie)}, ${p.featuredHomePosition ?? "null"}, ${sql(chapo)}, ${sql(p.cover ? img(p.cover) : null)}, ${i}`);
  lines.push(`) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;`);

  if (p.gallery.length > 0) {
    lines.push(`delete from project_images where project_id = (select id from projects where slug = ${sql(p.slug)});`);
    lines.push("insert into project_images (project_id, url, sort_order) values");
    lines.push(
      p.gallery
        .map((stem, gi) => `  ((select id from projects where slug = ${sql(p.slug)}), ${sql(img(stem))}, ${gi})`)
        .join(",\n") + ";",
    );
  }
  lines.push("");
});

// --- actualites + actualite_images ------------------------------------------
lines.push("-- Actualités : un bloc par fiche (insert de l'actualité, puis de sa galerie via son slug).");
ACTUALITES.forEach((a, i) => {
  lines.push(`insert into actualites (slug, titre, categorie, date_publication, extrait, sujet, corps, cover_image_url, publie, sort_order) values (`);
  lines.push(
    `  ${sql(a.slug)}, ${sql(a.titre)}, ${sql(a.categorie)}, ${sql(a.datePublication)}, ${sql(a.extrait)}, ${sql(a.sujet)}, '${JSON.stringify(a.corps).replace(/'/g, "''")}'::jsonb, ${sql(a.cover ? img(a.cover) : null)}, ${sql(a.publie)}, ${i}`,
  );
  lines.push(
    `) on conflict (slug) do update set titre = excluded.titre, categorie = excluded.categorie, date_publication = excluded.date_publication, extrait = excluded.extrait, sujet = excluded.sujet, corps = excluded.corps, cover_image_url = excluded.cover_image_url, publie = excluded.publie, sort_order = excluded.sort_order;`,
  );

  if (a.gallery.length > 0) {
    lines.push(`delete from actualite_images where actualite_id = (select id from actualites where slug = ${sql(a.slug)});`);
    lines.push("insert into actualite_images (actualite_id, url, sort_order) values");
    lines.push(
      a.gallery
        .map((stem, gi) => `  ((select id from actualites where slug = ${sql(a.slug)}), ${sql(img(stem))}, ${gi})`)
        .join(",\n") + ";",
    );
  }
  lines.push("");
});

// --- site_settings ----------------------------------------------------------
const SETTINGS: Record<string, string> = {
  contact_email: "contact@obaarchitectes.com",
  contact_adresse: "OBA Architectes FIRM\nCotonou, Sègbèya, Rue Immeuble 03 étages.",
  reseau_facebook: "",
  reseau_instagram: "",
  reseau_linkedin: "",
  stat_annee_creation: "2012",
  stat_annee_cotonou: "2015",
  stat_pays_intervention: "5",
  gm_nom: "Armel Adigoun",
  gm_role: "General Manager",
  gm_mot:
    "Avec nous, votre cadre de vie et d'activités ne seront plus jamais les mêmes.\n\nDans une simplicité de formes pures, des percées visuelles et lumineuses, de confort naturel – éclairage, ventilation – nous savons redonner goûts et couleurs à votre milieu de vie et d'activités.\n\nPassez du rêve à la Réalité…….",
  gm_photo_url: "",
};
lines.push("insert into site_settings (key, value) values");
lines.push(
  Object.entries(SETTINGS)
    .map(([k, v]) => `  (${sql(k)}, ${sql(v)})`)
    .join(",\n") + "\non conflict (key) do nothing;",
);
lines.push("");

process.stdout.write(lines.join("\n") + "\n");
