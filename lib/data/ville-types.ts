// Type partagé client/serveur — pas d'import "server-only" ici. Un Client
// Component (ex. BeninMap) doit importer CE fichier, jamais lib/data/villes.ts.

export type Ville = {
  id: string;
  nom: string;
  lat: number;
  lon: number;
  /** Titres des projets publiés rattachés à cette ville. */
  projets: string[];
};
