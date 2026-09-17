// Villes couvertes par le cabinet, portées telles quelles depuis
// site/benin-map-futur.js (VILLES). Alimentera la table `villes` de Supabase.

export type Ville = {
  nom: string;
  lat: number;
  lon: number;
  /** Libellés de projets rattachés à cette ville (texte libre, comme dans la maquette). */
  projets: string[];
};

export const VILLES: Ville[] = [
  { nom: "Cotonou", lat: 6.3667, lon: 2.4333, projets: ["Siège BRVM", "Siège GAB", "Siège SFP", "Siège ASA-Bénin", "Hôtel Sofitel", "Rénovation Azalaï", "Agences BIIC", "Agences Celtiis"] },
  { nom: "Porto-Novo", lat: 6.4969, lon: 2.6289, projets: ["Agence BIIC", "Agence La Poste"] },
  { nom: "Ouidah", lat: 6.3667, lon: 2.0833, projets: ["Requalification urbaine de Ouidah"] },
  { nom: "Avlékété", lat: 6.3167, lon: 2.15, projets: ["Golf Club d’Avlékété", "Club Med d’Avlékété"] },
  { nom: "Abomey-Calavi", lat: 6.4486, lon: 2.3556, projets: ["Agence Celtiis", "Villas et résidences"] },
  { nom: "Glo-Djigbé", lat: 6.7167, lon: 2.3, projets: ["Logements sociaux de Glo-Djigbé"] },
  { nom: "Allada", lat: 6.6656, lon: 2.1514, projets: ["Agence La Poste"] },
  { nom: "Comè", lat: 6.4056, lon: 1.8819, projets: ["Agence BIIC"] },
  { nom: "Lokossa", lat: 6.6389, lon: 1.7167, projets: ["Agence Celtiis"] },
  { nom: "Bohicon", lat: 7.1783, lon: 2.0667, projets: ["Agence BIIC", "Agence La Poste"] },
  { nom: "Abomey", lat: 7.1833, lon: 1.9833, projets: ["Agence Celtiis"] },
  { nom: "Dassa-Zoumè", lat: 7.75, lon: 2.1833, projets: ["Agence La Poste"] },
  { nom: "Savalou", lat: 7.9281, lon: 1.9756, projets: ["Agence BIIC"] },
  { nom: "Parakou", lat: 9.3372, lon: 2.6303, projets: ["Agence BIIC", "Agence Celtiis", "Agence La Poste"] },
  { nom: "Nikki", lat: 9.9401, lon: 3.2108, projets: ["Agence Celtiis"] },
  { nom: "Djougou", lat: 9.7086, lon: 1.6661, projets: ["Agence BIIC"] },
  { nom: "Natitingou", lat: 10.3042, lon: 1.3796, projets: ["Agence Celtiis", "Agence La Poste"] },
  { nom: "Tanguiéta", lat: 10.6222, lon: 1.2667, projets: ["Agence BIIC"] },
  { nom: "Kandi", lat: 11.1342, lon: 2.9386, projets: ["Agence Celtiis"] },
  { nom: "Malanville", lat: 11.8686, lon: 3.3831, projets: ["Agence BIIC", "Agence La Poste"] },
];
