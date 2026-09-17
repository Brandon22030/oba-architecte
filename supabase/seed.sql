-- Données de départ — générées depuis lib/data/*.ts par scripts/generate-seed-sql.ts
-- Ne pas éditer à la main : relancer `npx tsx scripts/generate-seed-sql.ts > supabase/seed.sql`.

insert into villes (nom, lat, lon, sort_order) values
  ('Cotonou', 6.3667, 2.4333, 0),
  ('Porto-Novo', 6.4969, 2.6289, 1),
  ('Ouidah', 6.3667, 2.0833, 2),
  ('Avlékété', 6.3167, 2.15, 3),
  ('Abomey-Calavi', 6.4486, 2.3556, 4),
  ('Glo-Djigbé', 6.7167, 2.3, 5),
  ('Allada', 6.6656, 2.1514, 6),
  ('Comè', 6.4056, 1.8819, 7),
  ('Lokossa', 6.6389, 1.7167, 8),
  ('Bohicon', 7.1783, 2.0667, 9),
  ('Abomey', 7.1833, 1.9833, 10),
  ('Dassa-Zoumè', 7.75, 2.1833, 11),
  ('Savalou', 7.9281, 1.9756, 12),
  ('Parakou', 9.3372, 2.6303, 13),
  ('Nikki', 9.9401, 3.2108, 14),
  ('Djougou', 9.7086, 1.6661, 15),
  ('Natitingou', 10.3042, 1.3796, 16),
  ('Tanguiéta', 10.6222, 1.2667, 17),
  ('Kandi', 11.1342, 2.9386, 18),
  ('Malanville', 11.8686, 3.3831, 19)
on conflict (nom) do update set lat = excluded.lat, lon = excluded.lon, sort_order = excluded.sort_order;

insert into team_members (name, role, sort_order) values
  ('Boris', 'Fondateur et Associé', 0),
  ('Armel', 'Architecte Associé', 1),
  ('Mohammed', 'Dessinateur CAO, DAO', 2),
  ('Ida', 'Technicienne Supérieure Bâtiment', 3),
  ('Etilyne', 'Assistante Administrative', 4),
  ('Elfisio', 'Technicien Supérieur Bâtiment', 5),
  ('Hidaayath', 'Architecte, Cheffe Projet', 6),
  ('Behidi', 'Architecte', 7),
  ('Julio', 'Architecte', 8),
  ('Issiaka', 'Technicien Supérieur', 9),
  ('David', 'Technicien Supérieur Bâtiment', 10)
on conflict (name) do update set role = excluded.role, sort_order = excluded.sort_order;

-- Projets : un bloc par fiche (insert du projet, puis de sa galerie via son slug).
insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'requalification-urbaine-ouidah', 'Requalification urbaine de Ouidah', 'Urbanisme', 'Requalification urbaine', (select id from villes where nom = 'Ouidah'), 'Ouidah', 'Mairie de Ouidah', 'Urbanisme', 'Étude et suivi de la requalification du front urbain et des espaces publics', 'Livré', true, 1, 'Un programme urbanisme implanté à Ouidah, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/ouidah-01.jpg', 0
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'requalification-urbaine-ouidah');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'requalification-urbaine-ouidah'), '/assets/img/ouidah-02.jpg', 0),
  ((select id from projects where slug = 'requalification-urbaine-ouidah'), '/assets/img/ouidah-03.jpg', 1),
  ((select id from projects where slug = 'requalification-urbaine-ouidah'), '/assets/img/ouidah-04.jpg', 2),
  ((select id from projects where slug = 'requalification-urbaine-ouidah'), '/assets/img/ouidah-05.jpg', 3),
  ((select id from projects where slug = 'requalification-urbaine-ouidah'), '/assets/img/ouidah-06.jpg', 4),
  ((select id from projects where slug = 'requalification-urbaine-ouidah'), '/assets/img/ouidah-07.jpg', 5);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'siege-brvm', 'Siège de la BRVM', 'Institution', 'Sièges et tertiaire', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'Bourse Régionale des Valeurs Mobilières', 'Architecture', 'Conception et suivi de réalisation du siège régional', 'Livré', true, 6, 'Un programme institution implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/brvm-03.jpg', 1
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'siege-brvm');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'siege-brvm'), '/assets/img/brvm-02.jpg', 0);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'hotel-sofitel', 'Hôtel Sofitel', 'Hôtellerie', 'Hôtellerie et loisirs', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'Groupe Accor', 'Architecture', 'Conception architecturale et suivi de chantier', 'Livré', true, 2, 'Un programme hôtellerie implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/sofitel-01.jpg', 2
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'hotel-sofitel');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'hotel-sofitel'), '/assets/img/sofitel-02.jpg', 0),
  ((select id from projects where slug = 'hotel-sofitel'), '/assets/img/sofitel-03.jpg', 1),
  ((select id from projects where slug = 'hotel-sofitel'), '/assets/img/sofitel-04.jpg', 2),
  ((select id from projects where slug = 'hotel-sofitel'), '/assets/img/sofitel-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'cove-beach-hotel', 'Cove Beach Hotel', 'Loisirs', 'Hôtellerie et loisirs', (select id from villes where nom = 'Avlékété'), 'Avlékété', 'Cove Beach SA', 'Architecture', 'Conception et suivi de réalisation d''un complexe balnéaire', 'Livré', true, 3, 'Un programme loisirs implanté à Avlékété, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/cove-01.jpg', 3
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'cove-beach-hotel');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'cove-beach-hotel'), '/assets/img/cove-02.jpg', 0),
  ((select id from projects where slug = 'cove-beach-hotel'), '/assets/img/cove-03.jpg', 1),
  ((select id from projects where slug = 'cove-beach-hotel'), '/assets/img/cove-04.jpg', 2),
  ((select id from projects where slug = 'cove-beach-hotel'), '/assets/img/cove-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'renovation-azalai', 'Rénovation de l''hôtel Azalaï', 'Hôtellerie', 'Hôtellerie et loisirs', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'Groupe Azalaï Hôtels', 'Architecture intérieure', 'Rénovation des espaces communs et des chambres', 'Livré', true, null, 'Un programme hôtellerie implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/azalai-01.jpg', 4
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'renovation-azalai');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'renovation-azalai'), '/assets/img/azalai-02.jpg', 0),
  ((select id from projects where slug = 'renovation-azalai'), '/assets/img/azalai-03.jpg', 1),
  ((select id from projects where slug = 'renovation-azalai'), '/assets/img/azalai-04.jpg', 2);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'club-med-avlekete', 'Club Med d''Avlékété', 'Loisirs', 'Hôtellerie et loisirs', (select id from villes where nom = 'Avlékété'), 'Avlékété', 'Club Méditerranée', 'Architecture', 'Conception et suivi de réalisation d''un village de vacances', 'Livré', true, null, 'Un programme loisirs implanté à Avlékété, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/clubmed-01.jpg', 5
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'club-med-avlekete');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'club-med-avlekete'), '/assets/img/clubmed-02.jpg', 0),
  ((select id from projects where slug = 'club-med-avlekete'), '/assets/img/clubmed-03.jpg', 1),
  ((select id from projects where slug = 'club-med-avlekete'), '/assets/img/clubmed-04.jpg', 2),
  ((select id from projects where slug = 'club-med-avlekete'), '/assets/img/clubmed-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'golf-club-avlekete', 'Golf Club d''Avlékété', 'Loisirs', 'Équipements et culture', (select id from villes where nom = 'Avlékété'), 'Avlékété', 'Golf Club d''Avlékété', 'Architecture, Paysagisme', 'Conception du club-house et aménagement paysager', 'Livré', true, null, 'Un programme loisirs implanté à Avlékété, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/golf-01.jpg', 6
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'golf-club-avlekete');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'golf-club-avlekete'), '/assets/img/golf-02.jpg', 0),
  ((select id from projects where slug = 'golf-club-avlekete'), '/assets/img/golf-03.jpg', 1),
  ((select id from projects where slug = 'golf-club-avlekete'), '/assets/img/golf-04.jpg', 2);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'logements-sociaux-glo-djigbe', 'Logements sociaux de Glo-Djigbé', 'Résidentiel', 'Logement social et habitat', (select id from villes where nom = 'Glo-Djigbé'), 'Glo-Djigbé', 'Société d''Investissement et de Promotion de Glo-Djigbé (GDIZ)', 'Architecture, Urbanisme', 'Conception de logements sociaux au sein de la zone industrielle', 'Livré', true, 4, 'Un programme résidentiel implanté à Glo-Djigbé, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/gdiz-01.jpg', 7
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'logements-sociaux-glo-djigbe');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'logements-sociaux-glo-djigbe'), '/assets/img/gdiz-02.jpg', 0),
  ((select id from projects where slug = 'logements-sociaux-glo-djigbe'), '/assets/img/gdiz-03.jpg', 1),
  ((select id from projects where slug = 'logements-sociaux-glo-djigbe'), '/assets/img/gdiz-04.jpg', 2);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'reseau-agences-biic', 'Réseau d''agences BIIC', 'Réseaux', 'Réseaux d''agences', null, 'Douze villes', 'Banque Internationale pour l''Industrie et le Commerce', 'Architecture, Suivi de projets', 'Conception type et déclinaison du réseau d''agences', 'Livré', true, null, 'Un programme réseaux implanté à Douze villes, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/biic-01.jpg', 8
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'reseau-agences-biic');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'reseau-agences-biic'), '/assets/img/biic-02.jpg', 0),
  ((select id from projects where slug = 'reseau-agences-biic'), '/assets/img/biic-03.jpg', 1),
  ((select id from projects where slug = 'reseau-agences-biic'), '/assets/img/biic-04.jpg', 2),
  ((select id from projects where slug = 'reseau-agences-biic'), '/assets/img/biic-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'reseau-agences-celtiis', 'Réseau d''agences Celtiis', 'Réseaux', 'Réseaux d''agences', null, 'Dix villes', 'Celtiis Bénin', 'Architecture, Suivi de projets', 'Conception type et déclinaison du réseau d''agences', 'Livré', true, 5, 'Un programme réseaux implanté à Dix villes, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/celtiis-01.jpg', 9
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'reseau-agences-celtiis');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'reseau-agences-celtiis'), '/assets/img/celtiis-02.jpg', 0),
  ((select id from projects where slug = 'reseau-agences-celtiis'), '/assets/img/celtiis-03.jpg', 1),
  ((select id from projects where slug = 'reseau-agences-celtiis'), '/assets/img/celtiis-04.jpg', 2),
  ((select id from projects where slug = 'reseau-agences-celtiis'), '/assets/img/celtiis-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'reseau-bureaux-la-poste', 'Réseau de bureaux de La Poste', 'Réseaux', 'Réseaux d''agences', null, 'Huit villes', 'La Poste du Bénin', 'Architecture, Suivi de projets', 'Conception type et déclinaison du réseau de bureaux', 'Livré', true, null, 'Un programme réseaux implanté à Huit villes, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/laposte-01.jpg', 10
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'reseau-bureaux-la-poste');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'reseau-bureaux-la-poste'), '/assets/img/laposte-02.jpg', 0),
  ((select id from projects where slug = 'reseau-bureaux-la-poste'), '/assets/img/laposte-03.jpg', 1),
  ((select id from projects where slug = 'reseau-bureaux-la-poste'), '/assets/img/laposte-04.jpg', 2),
  ((select id from projects where slug = 'reseau-bureaux-la-poste'), '/assets/img/laposte-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'siege-groupe-sfp', 'Siège du Groupe SFP', 'Tertiaire', 'Sièges et tertiaire', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'Groupe SFP', 'Architecture', 'Conception et suivi de réalisation du siège social', 'Livré', true, null, 'Un programme tertiaire implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/sfp-01.jpg', 11
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'siege-groupe-sfp');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'siege-groupe-sfp'), '/assets/img/sfp-02.jpg', 0),
  ((select id from projects where slug = 'siege-groupe-sfp'), '/assets/img/sfp-03.jpg', 1),
  ((select id from projects where slug = 'siege-groupe-sfp'), '/assets/img/sfp-04.jpg', 2),
  ((select id from projects where slug = 'siege-groupe-sfp'), '/assets/img/sfp-05.jpg', 3);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'siege-daves-expertise', 'Siège Dave''s Expertise', 'Tertiaire', 'Sièges et tertiaire', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'Dave''s Expertise', 'Architecture', 'Conception et suivi de réalisation du siège', 'Livré', true, null, 'Un programme tertiaire implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/daves-01.jpg', 12
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'siege-daves-expertise');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'siege-daves-expertise'), '/assets/img/daves-02.jpg', 0);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'immeuble-al-manar', 'Immeuble Al Manar', 'Résidentiel', 'Sièges et tertiaire', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'Al Manar', 'Architecture', 'Conception et suivi de réalisation d''un immeuble mixte', 'Livré', true, null, 'Un programme résidentiel implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', '/assets/img/almanar-02.jpg', 13
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;
delete from project_images where project_id = (select id from projects where slug = 'immeuble-al-manar');
insert into project_images (project_id, url, sort_order) values
  ((select id from projects where slug = 'immeuble-al-manar'), '/assets/img/almanar-01.jpg', 0);

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'siege-asa-benin', 'Siège ASA-Bénin', 'Tertiaire', 'Sièges et tertiaire', (select id from villes where nom = 'Cotonou'), 'Cotonou', 'ASA-Bénin', 'Architecture', 'Conception du siège social — dossier en cours de constitution', 'Étude', false, null, 'Un programme tertiaire implanté à Cotonou, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', null, 14
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;

insert into projects (slug, title, category, famille, ville_id, city_label, maitre_ouvrage, mission, mission_scope, statut, publie, featured_home_position, chapo, cover_image_url, sort_order) values (
  'villas-et-residences', 'Villas et résidences', 'Résidentiel', 'Villas et résidences', null, 'Cotonou, Abomey-Calavi', 'Maîtres d''ouvrage privés', 'Architecture', 'Conception de villas et résidences particulières', 'Livré', true, null, 'Un programme résidentiel implanté à Cotonou, Abomey-Calavi, conçu autour de percées visuelles et lumineuses et d''un confort naturel d''éclairage et de ventilation.', null, 15
) on conflict (slug) do update set title = excluded.title, category = excluded.category, famille = excluded.famille, ville_id = excluded.ville_id, city_label = excluded.city_label, maitre_ouvrage = excluded.maitre_ouvrage, mission = excluded.mission, mission_scope = excluded.mission_scope, statut = excluded.statut, publie = excluded.publie, featured_home_position = excluded.featured_home_position, chapo = excluded.chapo, cover_image_url = excluded.cover_image_url, sort_order = excluded.sort_order;

insert into site_settings (key, value) values
  ('contact_email', 'contact@obaarchitectes.com'),
  ('contact_adresse', 'OBA Architectes Firm
Antenne BAA Cotonou
Cotonou, Bénin'),
  ('reseau_facebook', ''),
  ('reseau_instagram', ''),
  ('reseau_linkedin', ''),
  ('stat_annee_creation', '2012'),
  ('stat_annee_cotonou', '2015'),
  ('stat_pays_intervention', '5')
on conflict (key) do nothing;

