# Eternam — édition tactile (PWA)

Appli web installable (iPhone, iPad, Android) qui fait tourner **Eternam** (Infogrames, 1992)
dans un émulateur DOS (js-dos / DOSBox en WebAssembly), avec commandes tactiles.

**Le jeu n'est pas inclus** : au premier lancement, on importe son propre fichier `eternam.jsdos`,
qui reste stocké sur l'appareil (IndexedDB). Le dépôt peut donc être public sans contenir le jeu.

## Mise en ligne (GitHub Pages)
1. Déposer le contenu de ce dossier à la racine d'un dépôt.
2. Settings → Pages → Source : « Deploy from a branch » → `main` / `(root)`.
3. Ouvrir l'adresse `https://<compte>.github.io/<dépôt>/` sur le téléphone.

## Sur le téléphone
- iPhone : Safari → Partager → « Sur l'écran d'accueil ». Android : Chrome → ⋮ → « Installer l'application ».
- Ouvrir l'appli → « Importer le jeu… » → choisir `eternam.jsdos`.
- Au démarrage le jeu demande une référence (ex. « 08 APR ») : bouton **Code** → mois → jour → « Saisir dans le jeu ».

## Mise à jour de l'appli
Modifier `VERSION` dans `sw.js` pour forcer le rechargement du cache hors ligne.
