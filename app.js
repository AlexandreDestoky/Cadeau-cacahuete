//SELECTION DU DOM
const ajouter = document.querySelector(".ajouter");
let prenoms = document.querySelectorAll("input[type=text]");
const formulaire = document.querySelector(".formulaire");

let nbrPrenoms = prenoms.length;
let tabPrenoms = [];
// console.log(nbrPrenoms);

ajouter.addEventListener("click",()=> {
  let input = document.createElement("input");
  input.setAttribute("type","text");
  nbrPrenoms++;
  input.placeholder = `Prénom ${nbrPrenoms}`;
  formulaire.insertBefore(input,ajouter);
})

formulaire.addEventListener("submit",(e)=> {
  e.preventDefault();
  prenoms = document.querySelectorAll("input[type=text]");
  prenoms.forEach(prenom=> {
    tabPrenoms.push(prenom.value);
  })
})
