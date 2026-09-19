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

-- Actualités : un bloc par fiche (insert de l'actualité, puis de sa galerie via son slug).
insert into actualites (slug, titre, categorie, date_publication, extrait, sujet, corps, cover_image_url, publie, sort_order) values (
  'interview-assouka-magazine-n5', 'Interview – Assouka Magzine N°5 / Août – Octobre 2023', 'Presse', '2023-10-01', 'Témoignage : Urbanisme – Penser aussi le future.', 'Témoignage : Urbanisme – Penser aussi le future', '[{"type":"paragraphe","texte":"Interview publiée dans Assouka Magazine N°5, édition août – octobre 2023."}]'::jsonb, null, true, 0
) on conflict (slug) do update set titre = excluded.titre, categorie = excluded.categorie, date_publication = excluded.date_publication, extrait = excluded.extrait, sujet = excluded.sujet, corps = excluded.corps, cover_image_url = excluded.cover_image_url, publie = excluded.publie, sort_order = excluded.sort_order;

insert into actualites (slug, titre, categorie, date_publication, extrait, sujet, corps, cover_image_url, publie, sort_order) values (
  'collaboration-moke-architectes-sofitel-cic-cotonou', 'OBA Architectes collabore avec Moke Architectes sur le projet Sofitel et la rénovation du CIC de Cotonou', 'News', '2023-05-01', 'OBA Architectes a participé durant 30 mois aux cotés du cabinet Néerlandais Moke Architectes à l''ambitieux projet de construction de l''Hôtel SOFITEL et de rénovation du Centre International de Conférences (CIC).', null, '[{"type":"paragraphe","texte":"OBA Architectes a participé durant 30 mois aux cotés du cabinet Néerlandais Moke Architectes à l''ambitieux projet de construction de l''Hôtel SOFITEL et de rénovation du Centre International de Conférences (CIC)."},{"type":"paragraphe","texte":"Ce fut un idyllique pari de transformer l''es-Hôtel Sheraton et le Centre International de conférences en un magnifique nouveau parc d''hôtel-conférence. Ce lieu qui reliera la culture locale à des expériences haut de gamme pour les loisirs, les conférences et le tourisme, tel étant le concept du projet. La conception célèbre le paysage naturel et crée un environnement durable et vert. L''eau du paysage, de l''océan atlantique traverse le cœur du nouvel hôtel pour continuer son processus vers les piscines et le terrain de golf."},{"type":"paragraphe","texte":"Nous y retrouvons dans ce majestueux complexe : L''Hôtel SOFITEL, Le Centre International de Conférences (CIC) rénové, Le So Lounge un bâtiment de loisirs et le So SPA un centre de bien-être."},{"type":"paragraphe","texte":"L''ensemble de ces bâtiments sont reliés entre eux par un magnifique par cet une galerie couverte sous forme de champignons."},{"type":"titre","texte":"L''Hôtel SOFITEL"},{"type":"paragraphe","texte":"La forme en S du Bénin Marina Hôtel (Hôtel Sheraton) est devenue un symbole au fil des ans, un fort caractéristique. Il est réintroduit dans le nouveau bâtiment d''une manière plus prononcée. La courbe est étendue et le bâtiment devient surélevé. Le volume du bâtiment s''élève ainsi du paysage environnement et devient, avec ses toits verts, une partie intégrante du paysage."},{"type":"paragraphe","texte":"L''aspect écailleux de la façade accentue son dynamisme et donne au bâtiment une apparence de suspens."},{"type":"paragraphe","texte":"Le bâtiment est dans un site exceptionnel, un majestueux paysage en bord de mer. Nous disposons de 200 chambres avec suites, toutes avec une vue sur mer."},{"type":"titre","texte":"Le CIC rénové"},{"type":"paragraphe","texte":"Le bâtiment du CIC de Cotonou revêt un symbolisme historique permanent chez tout Béninois ; construit en 1995 pour abriter le 6ème sommet de la francophonie ; il a été rénové en 2008."},{"type":"paragraphe","texte":"Depuis 2021, le CIC se trouve progressivement transformé avec une architecture entièrement nouvelle. La géométrie du bâtiment sera préservée tandis que la façade sera rénovée avec des matériaux plus permanents. Dans la partie basse de l''édifie, la façade s''écroulera donnant ainsi une expression plus ludique. Le hall d''entrée sera agrandi, le bâtiment devient plus transparent et plus ouvert pendant les évènements plus visibles."},{"type":"paragraphe","texte":"Le CIC sera transformé en une seule grande salle de conférence, plus adaptés aux grands rassemblements. La forme de l''espace central, qui rappelle celle d''une tente, est spectaculaire et convient parfaitement aux grandes rencontres internationales."},{"type":"titre","texte":"Le So Lounge"},{"type":"paragraphe","texte":"Le bâtiment de loisirs accueille le So Lounge, un casino et deux salles de cinémas. Le So Lounge est un concept de club, bar lounge."},{"type":"paragraphe","texte":"Le cinéma dispose d''écrans impressionnant et dont l''aménagement du mobilier et des équipements pouvant offrir la possibilité de l''utiliser comme salles polyvalentes en salon ou en salle de conférence."},{"type":"paragraphe","texte":"Des éléments en aluminium en lamelles dotés d''un système de fixation optimale, animent la façade du bâtiment de loisirs et seront de barreaudage et de brise-soleil raffinés. Ils constituent des éléments de décoration créatifs sur l''enveloppe du bâtiment."},{"type":"titre","texte":"Le So SPA"},{"type":"paragraphe","texte":"Le bâtiment du spa."}]'::jsonb, '/assets/img/sofitel-01.jpg', true, 1
) on conflict (slug) do update set titre = excluded.titre, categorie = excluded.categorie, date_publication = excluded.date_publication, extrait = excluded.extrait, sujet = excluded.sujet, corps = excluded.corps, cover_image_url = excluded.cover_image_url, publie = excluded.publie, sort_order = excluded.sort_order;
delete from actualite_images where actualite_id = (select id from actualites where slug = 'collaboration-moke-architectes-sofitel-cic-cotonou');
insert into actualite_images (actualite_id, url, sort_order) values
  ((select id from actualites where slug = 'collaboration-moke-architectes-sofitel-cic-cotonou'), '/assets/img/sofitel-02.jpg', 0),
  ((select id from actualites where slug = 'collaboration-moke-architectes-sofitel-cic-cotonou'), '/assets/img/sofitel-03.jpg', 1),
  ((select id from actualites where slug = 'collaboration-moke-architectes-sofitel-cic-cotonou'), '/assets/img/sofitel-04.jpg', 2),
  ((select id from actualites where slug = 'collaboration-moke-architectes-sofitel-cic-cotonou'), '/assets/img/sofitel-05.jpg', 3);

insert into actualites (slug, titre, categorie, date_publication, extrait, sujet, corps, cover_image_url, publie, sort_order) values (
  'village-vacances-avlekete-club-med', 'Projet de construction d''un village de vacances à Avlékété, Club MED', 'News', '2022-03-01', 'Dans la mise en oeuvre du Programme d''Actions Gouvernementales du Bénin (PAG), il a été retenu l''aménagement à Avlékété, commune de Ouidah, d''un village de vacances et de loisirs.', null, '[{"type":"paragraphe","texte":"Dans la mise en oeuvre du Programme d''Actions Gouvernementales du Bénin (PAG), il a été retenu l''aménagement à Avlékété, commune de Ouidah, d''un village de vacances et de loisirs avec pour promoteur le CLUB MED."},{"type":"paragraphe","texte":"Le cabinet OBA Architectes a été associé à la phase de conception de cet éminent projet en collaboration avec le cabinet d''Architectes français AW2."},{"type":"paragraphe","texte":"Des phases de reconnaissance du site du projet, de rencontre des populations bénéficiaires et d''implémentation concrète du projet sont périodiquement organisées par le cabinet d''Architectes local que nous sommes et bénéficient de la présence et de la participation des acteurs étrangers que sont le cabinet d''Architectes français AW2, le promoteur du projet le CLUB MED."}]'::jsonb, '/assets/img/clubmed-01.jpg', true, 2
) on conflict (slug) do update set titre = excluded.titre, categorie = excluded.categorie, date_publication = excluded.date_publication, extrait = excluded.extrait, sujet = excluded.sujet, corps = excluded.corps, cover_image_url = excluded.cover_image_url, publie = excluded.publie, sort_order = excluded.sort_order;
delete from actualite_images where actualite_id = (select id from actualites where slug = 'village-vacances-avlekete-club-med');
insert into actualite_images (actualite_id, url, sort_order) values
  ((select id from actualites where slug = 'village-vacances-avlekete-club-med'), '/assets/img/clubmed-02.jpg', 0),
  ((select id from actualites where slug = 'village-vacances-avlekete-club-med'), '/assets/img/clubmed-03.jpg', 1),
  ((select id from actualites where slug = 'village-vacances-avlekete-club-med'), '/assets/img/clubmed-04.jpg', 2),
  ((select id from actualites where slug = 'village-vacances-avlekete-club-med'), '/assets/img/clubmed-05.jpg', 3);

insert into actualites (slug, titre, categorie, date_publication, extrait, sujet, corps, cover_image_url, publie, sort_order) values (
  'article-presse-leconomiste-2019-12-13', 'Article de presse L''Economiste – 2019/12/13', 'Presse', '2019-12-13', 'Construction De Siège Au Bénin : Le Cabinet Oba Architectes Sélectionné Par La BRVM.', 'Construction De Siège Au Bénin : Le Cabinet Oba Architectes Sélectionné Par La BRVM', '[{"type":"paragraphe","texte":"Article paru dans L''Economiste du 13 décembre 2019."}]'::jsonb, null, true, 3
) on conflict (slug) do update set titre = excluded.titre, categorie = excluded.categorie, date_publication = excluded.date_publication, extrait = excluded.extrait, sujet = excluded.sujet, corps = excluded.corps, cover_image_url = excluded.cover_image_url, publie = excluded.publie, sort_order = excluded.sort_order;

insert into actualites (slug, titre, categorie, date_publication, extrait, sujet, corps, cover_image_url, publie, sort_order) values (
  'article-presse-la-nation-2019-12-16', 'Article de presse La Nation – 2019/12/16', 'Presse', '2019-12-16', 'Construction de l''antenne nationale de la Brvm à Cotonou : L''architecte et l''ossature du bâtiment dévoilés.', 'Construction de l''antenne nationale de la Brvm à Cotonou : L''architecte et l''ossature du bâtiment dévoilés', '[{"type":"paragraphe","texte":"Article paru dans La Nation du 16 décembre 2019."}]'::jsonb, null, true, 4
) on conflict (slug) do update set titre = excluded.titre, categorie = excluded.categorie, date_publication = excluded.date_publication, extrait = excluded.extrait, sujet = excluded.sujet, corps = excluded.corps, cover_image_url = excluded.cover_image_url, publie = excluded.publie, sort_order = excluded.sort_order;

insert into site_settings (key, value) values
  ('contact_email', 'contact@obaarchitectes.com'),
  ('contact_adresse', 'OBA Architectes FIRM
Cotonou, Sègbèya, Rue Immeuble 03 étages.'),
  ('reseau_facebook', ''),
  ('reseau_instagram', ''),
  ('reseau_linkedin', ''),
  ('stat_annee_creation', '2012'),
  ('stat_annee_cotonou', '2015'),
  ('stat_pays_intervention', '5'),
  ('gm_nom', 'Armel Adigoun'),
  ('gm_role', 'General Manager'),
  ('gm_mot', 'Avec nous, votre cadre de vie et d''activités ne seront plus jamais les mêmes.

Dans une simplicité de formes pures, des percées visuelles et lumineuses, de confort naturel – éclairage, ventilation – nous savons redonner goûts et couleurs à votre milieu de vie et d''activités.

Passez du rêve à la Réalité…….'),
  ('gm_photo_url', '')
on conflict (key) do nothing;

