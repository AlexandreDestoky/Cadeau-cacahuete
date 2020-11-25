//SELECTION DU DOM
const ajouter = document.querySelector(".ajouter");
const formulaire = document.querySelector(".formulaire");
const gant = document.querySelector(".gant");
const papier = document.querySelector(".papier");
const affichage = document.querySelector(".affichage");
const affichageText = document.querySelector(".affichage p");
const btnOui = document.querySelector(".oui");

//variable de travail
let prenoms = document.querySelectorAll("input[type=text]");
let tabPrenoms = [];
let nbrPrenoms = prenoms.length;
let tabPrenomsCadeau; // contient les objets associés
let cpt = 0;

//FONCTION D'ASSOCIATION DU PIOCHEUR ET DE LA PERSONNE QU'IL PIOCHE
let cadeau = (tableau) => {
  if (tableau.length < 2) {
    return "il faut envoyer un tableau de 2 éléments minimum";
  }
  let joueurTiree = [];
  let tabCadeau = [];
  let nbrPrenoms = tableau.length;
  let nbrRandom;

  for (let i = 0; i < nbrPrenoms; i++) {
    let cadeauPour;
    let piocheur = tableau[i]; //Attribution des piocheurs en suivant le tableau
    //si le piocheur est l'avant dernier piocheur, on vérifie que le nom du dernier piocheur a déja été tirée
    //afin d'éviter une boucle infini ou une erreur car le dernier sera obligé de se piocher lui même sinon
    if (i == nbrPrenoms - 2 && joueurTiree.includes(tableau[nbrPrenoms - 1]) == false) {
      //si le dernier piocheur n'a pas encore été pioché, on le fait piocher par l'avant dernier piocheur
      cadeauPour = tableau[nbrPrenoms - 1];
      joueurTiree.push(tableau[nbrPrenoms - 1]); // on ajoute le nombre au tableau de personne tirée
      //sinon on fait comme d'habitude
    } else {
      do {
        nbrRandom = Math.floor(Math.random() * nbrPrenoms); //on génére un nombre aléatoire max long tableau -1
        cadeauPour = tableau[nbrRandom]; // on attribue le cadeau a la personne au n°i correspondant
      } while (cadeauPour == piocheur || joueurTiree.includes(tableau[nbrRandom])); // si la personne se pioche ou pioche quelqu'un qui a déja été pioché on recommence
      joueurTiree.push(tableau[nbrRandom]); // on ajoute le nombre au tableau de personne tirée
    }
    tabCadeau.push({
      piocheur: piocheur,
      cadeauPour: cadeauPour,
    });
  }
  return tabCadeau;
};

//Ajout d'un input quand on clique sur le +
ajouter.addEventListener("click", () => {
  let input = document.createElement("input");
  nbrPrenoms++;
  input.type = "text";
  input.placeholder = `Prénom ${nbrPrenoms}`;
  input.name = `Prenom${nbrPrenoms}`;
  input.id = `Prenom${nbrPrenoms}`;
  formulaire.insertBefore(input, ajouter);
  input.focus();
});

//Quand on envoie le formulaire
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  prenoms = document.querySelectorAll("input[type=text]");
  prenoms.forEach((prenom) => {
    //on envoie qui si il y a une valeur dans l'input
    if (prenom.value) {
      tabPrenoms.push(prenom.value);
    }
  });
  if (tabPrenoms.length < 2) {
    alert("veuillez rentrez au moins 2 prénoms");
    tabPrenoms = [];
  } else {
    console.log(tabPrenoms);
    tabPrenomsCadeau = cadeau(tabPrenoms);
    console.log(tabPrenomsCadeau);
    formulaire.style.display = "none";
    affichage.style.display = "block";
    affichageText.textContent = `🎄🎅${tabPrenomsCadeau[cpt].piocheur}, es-tu seul devant l'ordinateur ?🎅🎄`;
  }
});

let animation = () => {
  gant.style.display = "block";
  papier.style.display = "block";
  affichage.style.display = "none";
  setTimeout(() => {
    papier.style.top = "0px";
    papier.textContent = tabPrenomsCadeau[cpt].cadeauPour;
    cpt++;
  }, 2000);
  setTimeout(() => {
  if(cpt >= tabPrenomsCadeau.length) {
    affichageText.textContent = `🎄🎅Tirage terminé joyeux Noel !🎅🎄`;
    btnOui.style.display = "none";
  } else {
      papier.style.top = "40vh";
      papier.textContent = "";
      affichageText.textContent = `🎄🎅${tabPrenomsCadeau[cpt].piocheur}, es-tu seul devant l'ordinateur ?🎅🎄`;
    }
    affichage.style.display = "block";
    gant.style.display = "none";
    papier.style.display = "none";
  }, 10000);
};

btnOui.addEventListener("click", () => {
  setTimeout(animation, 500);
});
