# Galerie d’images tactile avec Hammer.js FOAD CDWFS 2025
## Objectif

    L’objectif de ce TP est de créer une galerie d’images interactive qui réagit aux gestes tactiles grâce à la librairie Hammer.js.
    Les stagiaires doivent implémenter une navigation fluide entre plusieurs images et une réinitialisation par double tap.
    Les fonctionnalités de zoom et rotation sont proposées en bonus.

## Technologies utilisées

    - HTML
    - CSS
    - JavaScript
    - Hammer.js (importé via un lien CDN)

## Structure du projet

    Le projet doit respecter la structure suivante :

    /galerie-tactile
    │
    ├── index.html
    ├── README.md
    └── assets/
        ├── js/
        │   └── script.js
        ├── css/
        │   └── style.css
        └── img/
            ├── photo1.jpg
            ├── photo2.jpg
            ├── photo3.jpg
            └── photo4.jpg


    Le dossier assets contient :

    - css/ → les feuilles de style
    - js/ → les scripts JavaScript
    - img/ → les images de la galerie 

    Les images fournies le sont à titre d'exemple. N'hésitez pas à les remplacer, utiliser un autre format, une autre taille, etc.

## Fonctionnalités à implémenter
    1 - Navigation tactile

        Swipe gauche / droite : permet de passer à l’image suivante ou précédente.

    2 - Réinitialisation

        Double tap : remet l’image à son état initial (taille et rotation par défaut).

    3 - Bonus (facultatif)

        Pinch : permet de zoomer ou dézoomer sur l’image (utilisation de transform: scale()).

        Rotate : permet de faire pivoter légèrement l’image selon le geste.

## Contraintes et bonnes pratiques

    Le projet doit être fonctionnel sur mobile et tablette.
    L’image doit toujours rester visible à l’écran, même après rotation ou zoom.
    Dans la feuille de style, l’élément image doit comporter :

    
```css
    img {
        touch-action: none; /* nécessaire pour activer les gestes tactiles avec Hammer.js */
    }
```
    

    Les effets visuels (changement d’image, transitions, etc.) doivent être fluides.

    Le code doit être clair, commenté et organisé.

    Les stagiaires peuvent ajouter des boutons ou raccourcis clavier pour la navigation, afin d’assurer une compatibilité desktop.

## Pistes d’amélioration (bonus facultatifs)

    Les stagiaires peuvent aller plus loin en ajoutant :

    - Un compteur de gestes (nombre de swipes, taps, etc.)
    - Une animation de transition entre les images
    - Un mode sombre ou un changement de thème via un geste
    - Un bouton “reset” visible à l’écran
    - Des effets de fluidité CSS sur le zoom ou la rotation

## Livrable attendu

    Chaque stagiaire doit rendre un repository Git nommé :

    "galerie-tactile-[prenom-nom]"

    Ce dépôt devra contenir :

    - index.html
    - README.md (reprenant la description du projet)
    - assets/css/style.css
    - assets/js/script.js
    - assets/img/ (avec les images utilisées)

    Merci de me le transmettre via discord en mp.

Bon courage à tous.