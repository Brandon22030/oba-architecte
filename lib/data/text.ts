/**
 * Texte de présentation générique — mêmes gabarits que texteDemo() dans la
 * maquette d'origine. Utilisé pour préremplir `chapo`/`description` au seed,
 * et comme repli côté runtime tant que l'admin n'a pas écrit le vrai texte
 * d'un projet (cf. site/LISEZ-MOI.txt).
 */
export function texteDemo(input: { category: string; city: string }) {
  const catLower = input.category.toLowerCase();
  const chapo = `Un programme ${catLower} implanté à ${input.city}, conçu autour de percées visuelles et lumineuses et d'un confort naturel d'éclairage et de ventilation.`;
  const p1 =
    "Le projet s'inscrit dans une lecture attentive du site et de son orientation, afin de tirer parti de la course du soleil et des vents dominants pour limiter les apports thermiques et favoriser une ventilation naturelle traversante.";
  const p2 =
    "Le traitement des façades privilégie des matériaux locaux et pérennes, mis en œuvre avec une exigence de finition qui inscrit l'ouvrage dans la durée tout en affirmant une écriture architecturale contemporaine.";
  const p3 =
    "OBA Architectes Firm a assuré la mission de la conception jusqu'au suivi de réalisation, en coordination étroite avec le maître d'ouvrage et l'ensemble des intervenants du chantier.";
  return { chapo, description: `${p1}\n\n${p2}\n\n${p3}` };
}
