-- OBA Architectes Firm — schéma Supabase
-- À exécuter une fois dans l'éditeur SQL du projet Supabase (Database > SQL Editor).
-- Idempotent : peut être ré-exécuté sans dupliquer les objets.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- villes : géographie fixe (20 villes couvertes), alimente la carte Territoire
-- et le champ "Ville rattachée à la carte" de la fiche projet.
-- ---------------------------------------------------------------------------
create table if not exists villes (
  id uuid primary key default gen_random_uuid(),
  nom text not null unique,
  lat numeric not null,
  lon numeric not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- team_members : équipe affichée sur la page À propos, gérable depuis
-- l'écran admin "Équipe" (photo via Supabase Storage, bucket team-avatars).
-- ---------------------------------------------------------------------------
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  role text not null,
  avatar_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects : la liste de référence (16 fiches), avec une catégorie publique
-- (filtre du site vitrine) distincte de la famille interne (regroupement admin).
-- city_label est un libellé de secours en texte libre pour les projets en
-- réseau qui ne se rattachent pas à une seule ville (ex. "Dix villes").
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  famille text not null,
  ville_id uuid references villes(id) on delete set null,
  city_label text,
  maitre_ouvrage text,
  mission text,
  mission_scope text,
  statut text not null default 'Étude' check (statut in ('Livré', 'En chantier', 'Concours lauréat', 'Étude')),
  publie boolean not null default false,
  featured_home_position int,
  chapo text,
  description text,
  cover_image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- un seul projet par position de mise en avant sur l'accueil
create unique index if not exists projects_featured_home_position_key
  on projects (featured_home_position)
  where featured_home_position is not null;

-- ---------------------------------------------------------------------------
-- project_images : galerie d'un projet (couverture référencée séparément par
-- projects.cover_image_url pour un accès direct sans jointure).
-- ---------------------------------------------------------------------------
create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_requests : soumissions du formulaire public (5 champs) + champs de
-- qualification enrichis manuellement par l'admin après prise de contact.
-- ---------------------------------------------------------------------------
create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  societe text,
  email text not null,
  telephone text,
  nature_projet text,
  message text not null,
  famille text,
  mission text,
  sites text,
  villes text,
  foncier text,
  procedure text,
  statut text not null default 'nouvelle' check (statut in ('nouvelle', 'traitée')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site_settings : informations globales du site (email/adresse/réseaux
-- sociaux/chiffres clés de l'accueil), éditables depuis l'écran "Réglages".
-- Le nombre de collaborateurs n'est PAS stocké ici : il est calculé en direct
-- depuis count(team_members).
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table villes enable row level security;
alter table team_members enable row level security;
alter table projects enable row level security;
alter table project_images enable row level security;
alter table contact_requests enable row level security;
alter table site_settings enable row level security;

-- Lecture publique (site vitrine) : villes, équipe, réglages toujours visibles ;
-- projets et leurs images seulement pour les projets publiés.
drop policy if exists "villes_public_read" on villes;
create policy "villes_public_read" on villes for select using (true);

drop policy if exists "team_members_public_read" on team_members;
create policy "team_members_public_read" on team_members for select using (true);

drop policy if exists "site_settings_public_read" on site_settings;
create policy "site_settings_public_read" on site_settings for select using (true);

drop policy if exists "projects_public_read" on projects;
create policy "projects_public_read" on projects for select using (publie = true);

drop policy if exists "project_images_public_read" on project_images;
create policy "project_images_public_read" on project_images for select using (
  exists (select 1 from projects p where p.id = project_images.project_id and p.publie = true)
);

-- Écriture : réservée aux utilisateurs authentifiés (le compte admin créé
-- manuellement dans Supabase Auth — pas d'inscription publique).
drop policy if exists "villes_admin_write" on villes;
create policy "villes_admin_write" on villes for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "team_members_admin_write" on team_members;
create policy "team_members_admin_write" on team_members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "site_settings_admin_write" on site_settings;
create policy "site_settings_admin_write" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "projects_admin_read_all" on projects;
create policy "projects_admin_read_all" on projects for select using (auth.role() = 'authenticated');

drop policy if exists "projects_admin_write" on projects;
create policy "projects_admin_write" on projects for insert with check (auth.role() = 'authenticated');
drop policy if exists "projects_admin_update" on projects;
create policy "projects_admin_update" on projects for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "projects_admin_delete" on projects;
create policy "projects_admin_delete" on projects for delete using (auth.role() = 'authenticated');

drop policy if exists "project_images_admin_read_all" on project_images;
create policy "project_images_admin_read_all" on project_images for select using (auth.role() = 'authenticated');
drop policy if exists "project_images_admin_write" on project_images;
create policy "project_images_admin_write" on project_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- contact_requests : n'importe qui peut déposer une demande (formulaire
-- public), seul l'admin authentifié peut les lire/traiter — protège les
-- coordonnées des visiteurs d'une lecture publique.
drop policy if exists "contact_requests_public_insert" on contact_requests;
create policy "contact_requests_public_insert" on contact_requests for insert with check (true);

drop policy if exists "contact_requests_admin_read" on contact_requests;
create policy "contact_requests_admin_read" on contact_requests for select using (auth.role() = 'authenticated');
drop policy if exists "contact_requests_admin_update" on contact_requests;
create policy "contact_requests_admin_update" on contact_requests for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "contact_requests_admin_delete" on contact_requests;
create policy "contact_requests_admin_delete" on contact_requests for delete using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage : buckets pour les photos de projets et les portraits d'équipe.
-- Lecture publique, écriture réservée aux utilisateurs authentifiés.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('team-avatars', 'team-avatars', true)
on conflict (id) do nothing;

drop policy if exists "project_images_bucket_public_read" on storage.objects;
create policy "project_images_bucket_public_read" on storage.objects for select using (bucket_id = 'project-images');
drop policy if exists "project_images_bucket_admin_write" on storage.objects;
create policy "project_images_bucket_admin_write" on storage.objects for all using (bucket_id = 'project-images' and auth.role() = 'authenticated') with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

drop policy if exists "team_avatars_bucket_public_read" on storage.objects;
create policy "team_avatars_bucket_public_read" on storage.objects for select using (bucket_id = 'team-avatars');
drop policy if exists "team_avatars_bucket_admin_write" on storage.objects;
create policy "team_avatars_bucket_admin_write" on storage.objects for all using (bucket_id = 'team-avatars' and auth.role() = 'authenticated') with check (bucket_id = 'team-avatars' and auth.role() = 'authenticated');
