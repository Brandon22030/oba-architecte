// Données de départ (seed) pour la table Supabase `actualites` — utilisées
// uniquement par scripts/generate-seed-sql.ts, PAS par les pages du site
// (celles-ci lisent Supabase directement, cf. lib/data/actualites.ts).
//
// Contenu réel repris tel quel de la maquette site/oba-actualite.html
// (dates, textes, images) — pas de texte de démonstration ici.

import type { ActualiteBlock } from "../actualite-constants";

export type ActualiteSeed = {
  slug: string;
  titre: string;
  categorie: string;
  datePublication: string; // ISO
  extrait: string;
  sujet: string | null;
  corps: ActualiteBlock[];
  cover: string | null;
  gallery: string[];
  publie: boolean;
};

const p = (texte: string): ActualiteBlock => ({ type: "paragraphe", texte });
const h = (texte: string): ActualiteBlock => ({ type: "titre", texte });

export const ACTUALITES: ActualiteSeed[] = [
  {
    slug: "interview-assouka-magazine-n5",
    titre: "Interview – Assouka Magzine N°5 / Août – Octobre 2023",
    categorie: "Presse",
    datePublication: "2023-10-01",
    extrait: "Témoignage : Urbanisme – Penser aussi le future.",
    sujet: "Témoignage : Urbanisme – Penser aussi le future",
    corps: [p("Interview publiée dans Assouka Magazine N°5, édition août – octobre 2023.")],
    cover: null,
    gallery: [],
    publie: true,
  },
  {
    slug: "collaboration-moke-architectes-sofitel-cic-cotonou",
    titre: "OBA Architectes collabore avec Moke Architectes sur le projet Sofitel et la rénovation du CIC de Cotonou",
    categorie: "News",
    datePublication: "2023-05-01",
    extrait:
      "OBA Architectes a participé durant 30 mois aux cotés du cabinet Néerlandais Moke Architectes à l'ambitieux projet de construction de l'Hôtel SOFITEL et de rénovation du Centre International de Conférences (CIC).",
    sujet: null,
    corps: [
      p(
        "OBA Architectes a participé durant 30 mois aux cotés du cabinet Néerlandais Moke Architectes à l'ambitieux projet de construction de l'Hôtel SOFITEL et de rénovation du Centre International de Conférences (CIC).",
      ),
      p(
        "Ce fut un idyllique pari de transformer l'es-Hôtel Sheraton et le Centre International de conférences en un magnifique nouveau parc d'hôtel-conférence. Ce lieu qui reliera la culture locale à des expériences haut de gamme pour les loisirs, les conférences et le tourisme, tel étant le concept du projet. La conception célèbre le paysage naturel et crée un environnement durable et vert. L'eau du paysage, de l'océan atlantique traverse le cœur du nouvel hôtel pour continuer son processus vers les piscines et le terrain de golf.",
      ),
      p(
        "Nous y retrouvons dans ce majestueux complexe : L'Hôtel SOFITEL, Le Centre International de Conférences (CIC) rénové, Le So Lounge un bâtiment de loisirs et le So SPA un centre de bien-être.",
      ),
      p("L'ensemble de ces bâtiments sont reliés entre eux par un magnifique par cet une galerie couverte sous forme de champignons."),
      h("L'Hôtel SOFITEL"),
      p(
        "La forme en S du Bénin Marina Hôtel (Hôtel Sheraton) est devenue un symbole au fil des ans, un fort caractéristique. Il est réintroduit dans le nouveau bâtiment d'une manière plus prononcée. La courbe est étendue et le bâtiment devient surélevé. Le volume du bâtiment s'élève ainsi du paysage environnement et devient, avec ses toits verts, une partie intégrante du paysage.",
      ),
      p("L'aspect écailleux de la façade accentue son dynamisme et donne au bâtiment une apparence de suspens."),
      p(
        "Le bâtiment est dans un site exceptionnel, un majestueux paysage en bord de mer. Nous disposons de 200 chambres avec suites, toutes avec une vue sur mer.",
      ),
      h("Le CIC rénové"),
      p(
        "Le bâtiment du CIC de Cotonou revêt un symbolisme historique permanent chez tout Béninois ; construit en 1995 pour abriter le 6ème sommet de la francophonie ; il a été rénové en 2008.",
      ),
      p(
        "Depuis 2021, le CIC se trouve progressivement transformé avec une architecture entièrement nouvelle. La géométrie du bâtiment sera préservée tandis que la façade sera rénovée avec des matériaux plus permanents. Dans la partie basse de l'édifie, la façade s'écroulera donnant ainsi une expression plus ludique. Le hall d'entrée sera agrandi, le bâtiment devient plus transparent et plus ouvert pendant les évènements plus visibles.",
      ),
      p(
        "Le CIC sera transformé en une seule grande salle de conférence, plus adaptés aux grands rassemblements. La forme de l'espace central, qui rappelle celle d'une tente, est spectaculaire et convient parfaitement aux grandes rencontres internationales.",
      ),
      h("Le So Lounge"),
      p("Le bâtiment de loisirs accueille le So Lounge, un casino et deux salles de cinémas. Le So Lounge est un concept de club, bar lounge."),
      p(
        "Le cinéma dispose d'écrans impressionnant et dont l'aménagement du mobilier et des équipements pouvant offrir la possibilité de l'utiliser comme salles polyvalentes en salon ou en salle de conférence.",
      ),
      p(
        "Des éléments en aluminium en lamelles dotés d'un système de fixation optimale, animent la façade du bâtiment de loisirs et seront de barreaudage et de brise-soleil raffinés. Ils constituent des éléments de décoration créatifs sur l'enveloppe du bâtiment.",
      ),
      h("Le So SPA"),
      p("Le bâtiment du spa."),
    ],
    cover: "sofitel-01",
    gallery: ["sofitel-02", "sofitel-03", "sofitel-04", "sofitel-05"],
    publie: true,
  },
  {
    slug: "village-vacances-avlekete-club-med",
    titre: "Projet de construction d'un village de vacances à Avlékété, Club MED",
    categorie: "News",
    datePublication: "2022-03-01",
    extrait:
      "Dans la mise en oeuvre du Programme d'Actions Gouvernementales du Bénin (PAG), il a été retenu l'aménagement à Avlékété, commune de Ouidah, d'un village de vacances et de loisirs.",
    sujet: null,
    corps: [
      p(
        "Dans la mise en oeuvre du Programme d'Actions Gouvernementales du Bénin (PAG), il a été retenu l'aménagement à Avlékété, commune de Ouidah, d'un village de vacances et de loisirs avec pour promoteur le CLUB MED.",
      ),
      p("Le cabinet OBA Architectes a été associé à la phase de conception de cet éminent projet en collaboration avec le cabinet d'Architectes français AW2."),
      p(
        "Des phases de reconnaissance du site du projet, de rencontre des populations bénéficiaires et d'implémentation concrète du projet sont périodiquement organisées par le cabinet d'Architectes local que nous sommes et bénéficient de la présence et de la participation des acteurs étrangers que sont le cabinet d'Architectes français AW2, le promoteur du projet le CLUB MED.",
      ),
    ],
    cover: "clubmed-01",
    gallery: ["clubmed-02", "clubmed-03", "clubmed-04", "clubmed-05"],
    publie: true,
  },
  {
    slug: "article-presse-leconomiste-2019-12-13",
    titre: "Article de presse L'Economiste – 2019/12/13",
    categorie: "Presse",
    datePublication: "2019-12-13",
    extrait: "Construction De Siège Au Bénin : Le Cabinet Oba Architectes Sélectionné Par La BRVM.",
    sujet: "Construction De Siège Au Bénin : Le Cabinet Oba Architectes Sélectionné Par La BRVM",
    corps: [p("Article paru dans L'Economiste du 13 décembre 2019.")],
    cover: null,
    gallery: [],
    publie: true,
  },
  {
    slug: "article-presse-la-nation-2019-12-16",
    titre: "Article de presse La Nation – 2019/12/16",
    categorie: "Presse",
    datePublication: "2019-12-16",
    extrait: "Construction de l'antenne nationale de la Brvm à Cotonou : L'architecte et l'ossature du bâtiment dévoilés.",
    sujet: "Construction de l'antenne nationale de la Brvm à Cotonou : L'architecte et l'ossature du bâtiment dévoilés",
    corps: [p("Article paru dans La Nation du 16 décembre 2019.")],
    cover: null,
    gallery: [],
    publie: true,
  },
];
