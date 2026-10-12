"use client";

import { useSyncExternalStore } from "react";

// Créé une seule fois au niveau du module : instancier un Intl.DateTimeFormat
// est coûteux, inutile de le refaire à chaque rendu.
const formatteurLome = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Africa/Lome", // UTC+0, pas de changement d'heure
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// React appelle `subscribe` pour savoir QUAND relire l'heure.
// On le prévient toutes les 10 s : l'affichage n'a que les minutes,
// donc le décalage maximal est de 10 secondes.
function subscribe(prevenirReact: () => void) {
  const id = setInterval(prevenirReact, 10_000);
  return () => clearInterval(id);
}

// Valeur lue dans le navigateur.
function getSnapshot() {
  return formatteurLome.format(new Date());
}

// Valeur utilisée côté serveur ET pendant l'hydratation : identique pour
// tout le monde, donc aucun décalage entre le HTML serveur et le navigateur.
function getServerSnapshot() {
  return "--:--";
}

export default function LomeClock() {
  const heure = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="font-mono text-xs font-medium text-encre-douce">
      Lomé • <span className="text-encre">{heure}</span>
    </span>
  );
}