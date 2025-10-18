// stockage des photos dans une table
//attributs de maphoto : src=lien fichier, alt=index dans la table
const tabImg =["./assets/img/photo1.jpg",
    "./assets/img/photo2.jpg",
    "./assets/img/photo3.jpg",
    "./assets/img/photo4.jpg"];
const nbImg=4;  //nombre d'images stockées dans la table

//newScale et newRotate sont déclarées ici afin de mieux gérer l'agrandissement et la rotation
let newRotate= 0;
let newScale= 1;

//pour adapter mes images à la taille de l'écran j'ai besoin des variables suivantes
const wWidth= window.innerWidth;
const wHeight=window.innerHeight;
let imgWRatio=0;
let imgHRatio=0;
let newWidth= 0;
let newHeight=0;

// Variables globales pour mettre en cache l'état de l'événement dans le cas du pinch
let evCache = new Array();
let prevDiff = -1;


const initTactile = ()=>{
    console.log("tactile");
    const tactile= document.getElementById("tactile");
    const mc = new Hammer(tactile);

    //manager pour me donner la main sur la gestion des pointers
    const mc1=new Hammer.Manager(tactile);

    //activation du pinch et du rotate qui ne le sont pas par défaut
    mc1.get('pinch').set({ enable: true });
    mc1.get('rotate').set({ enable: true });

    // Je crée 1 pointeur pour le pinch
    const pinch = new Hammer.Pinch();
    // Je crée 1 pointeur pour le rotate
    const rotate = new Hammer.Rotate();
    // j'ajoute celui du double tap qui correspond à 2 taps
    mc1.add( new Hammer.Tap({ event: "doubletap", taps: 2 }) );
    // J'ajoute les pointers dans le manager
    mc1.add(pinch);
    mc1.add(rotate);
   

    // Ajoute les gestionnaires d'événements pour la cible du pointeur
    // up,down,move,cancel,out,leave
    tactile.onpointerdown = pointerdown_handler;
    tactile.onpointermove = pointermove_handler;
    tactile.onpointerup = pointerup_handler;
    tactile.onpointercancel = pointerup_handler;
    tactile.onpointerout = pointerup_handler;
    tactile.onpointerleave = pointerup_handler;

    function pointerdown_handler(ev) {
    // L'événement pointerdown signale le début d'une interraction de toucher.
    // L'événement est mis en cache pour prendre en charge les gestes à 2 doigts
        evCache.push(ev);
        console.log("pointerDown", ev);
    }

    function pointerup_handler(ev) {
        console.log(ev.type, ev);
        // Retire ce pointeur du cache 
        remove_event(ev);
        
        // Si le nombre de pointeurs restant est inférieur à deux, remet à zéro la différence
        if (evCache.length < 2) prevDiff = -1;
    }

    function remove_event(ev) {
        // Supprime l'événement du cache
        for (var i = 0; i < evCache.length; i++) {
            if (evCache[i].pointerId == ev.pointerId) {
            evCache.splice(i, 1);
            break;
            }
        }
    }
    
    function pointermove_handler(ev) {
        // Cette fonction implémente la détection du mouvement horizontal pincer/zoomer.
        //
        // Si la distance entre les deux pointeurs augmente (zoomer),l'image grandit 
        //et si la distance diminue (dezoomer), l'image diminue.
        //
        console.log("pointerMove", ev);
      
        // Trouve le pointeur en cours dans le cache et le met à jour avec cet événement
        for (var i = 0; i < evCache.length; i++) {
          if (ev.pointerId === evCache[i].pointerId) {
            evCache[i] = ev;
            break;
          }
        }
        // Si deux pointeurs sont utilisés, vérifie le geste de pincement
        if (evCache.length === 2) {
            // Calcule la distance entre les deux pointeurs
            let curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
            // let scaleDiff=0;
            if (prevDiff > 0) {
                // Je calcule le scale en fct de la distance
                // scaleDiff=curDiff/document.getElementById("maphoto").getAttribute(width);
                if (curDiff > prevDiff) {
                // La distance entre les deux pointeurs a augmenté
                    console.log("Je zoome", ev);        
                    newScale = Math.max(1, newScale * (ev.scale));
                }
                if (curDiff < prevDiff) {
                // La distance entre les deux pointeurs a diminué
                    console.log("Je dézoome", ev);
                    newScale = Math.min(newScale, newScale * (ev.scale));
                }            
          }
            // Met en cache la distance pour les événements suivants
            prevDiff = curDiff;
        }
    }

    //fonction qui calcule la nouvelle taille de l'image pour l'adapter à l'écran
    function redimImg() {
        imgWRatio= Math.round(wWidth/document.getElementById("maphoto").getAttribute("width"));
        imgHRatio= Math.round(wHeight/document.getElementById("maphoto").getAttribute("height"));
    //l'image déborde de l'écran en largeur, on redimentionne
        if (imgWRatio<1) {
            newWidth= document.getElementById("maphoto").getAttribute("width")*imgWRatio;
            newHeight= document.getElementById("maphoto").getAttribute("height")*imgHRatio;
            document.getElementById("maphoto").setAttribute("width",newWidth);
            document.getElementById("maphoto").setAttribute("height",newHeight);             
        }
    }

    //swipe : navigation dans les images disponibles
    mc.on("swiperight swipeleft",(event)=>{
        // je récupère l'index de l'image en cours d'affichage
        let indImg=document.getElementById("maphoto").getAttribute("alt");

        //si left, j'affiche l'image suivante
        if (event.type === "swipeleft"){
            indImg++;
            if (indImg<nbImg) {
                document.getElementById("maphoto").setAttribute("alt",indImg);
                document.getElementById("maphoto").setAttribute("src",tabImg[indImg]);
            }
            else{
                document.getElementById("maphoto").setAttribute("alt","0");
                document.getElementById("maphoto").setAttribute("src",tabImg[0]);
            }
        }
        
        //si right, j'affiche l'image précédente
        if (event.type === "swiperight"){
            indImg--;
            if (indImg>0) {
                document.getElementById("maphoto").setAttribute("alt",indImg);
                document.getElementById("maphoto").setAttribute("src",tabImg[indImg]);
            }
            else{
                document.getElementById("maphoto").setAttribute("alt","0");
                document.getElementById("maphoto").setAttribute("src",tabImg[0]);
            }
        }
    })

    // double tap remet la taille et la rotation à son état initial
    mc1.on("doubletap",(event)=>{
        document.getElementById("maphoto").style.transform ="rotate(0deg)";
        document.getElementById("maphoto").style.transform = "scale(1)";
        newRotate= 0;
        newScale= 1;
    })
    redimImg();

    //pinch: agrandit ou rétrécit l'image affichée selon le mouvement des doigts
    mc1.on("pinch pinchend",(event)=>{
        if(event.type === "pinchend") {
            document.getElementById("maphoto").style.transform = "scale("+newScale+")";  
        }
    })
    
    //rotate: effectue une rotation sur l'image affichée selon le mouvement des doigts
    mc1.on("rotatestart rotatemove rotateend",(event)=>{
        if (event.type === "rotatestart"){
            newRotate = event.rotation;
        } 
        if (event.type === "rotatemove"){
            newRotate= newRotate + event.rotation;
        }
        if(event.type === "rotateend"){
            document.getElementById("maphoto").style.transform = "rotate("+newRotate+"deg)";
        }    
    })
    
}


export{initTactile};