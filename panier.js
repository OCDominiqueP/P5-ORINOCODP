// On attend que le document soit chargé
window.onload = () => {
  // Ici le document est chargé
  const idproduits = window.location.search;

  fetch("http://localhost:3000/api/furniture/" + idproduits)
    .then((res) => res.json())
    .then((data) => {

      produit = data;    
      
//Mise a jour du nombre de produit dans l'onglet panier
function chargementPanier(){
    let nombreProduit = localStorage.getItem('qté'); 
    
    if(nombreProduit){
    document.querySelector ('.totalQté').textContent = nombreProduit;
    }else{
        document.querySelector ('.totalQté').textContent = 0 ;
    }
}

chargementPanier(); 

//    Affichage des articles mis au panier dans la page panier
function affichagePanier(){

let data = JSON.parse(localStorage.getItem('panier'));


//on enregistre les valeurs du prix total dans une variable
var total = localStorage.getItem('prixTotal');
var prixPanier = document.getElementById('total');

// affichage du prix total du panier si le panier contient quelque chose...Sinon on affiche "votre panier est vide"
if (total != null) {
  prixPanier.textContent = 'Le montant de votre commande est de : ' + total +  ' €';
  prixPanier.id = 'prixTotal'; 
} else  {
  prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
}

// affichage des produits au panier sous forme de petites fiches articles
let productContainer = document.getElementById("basket");

if( data == null || total == 0 ) {
  var div = document.createElement('div');
  div.textContent = " Votre panier est vide ";
  basket.appendChild(div);
} else {
  productContainer.innerHTML = '';

  //on récupere les valeurs dans le localStorage 
  Object.values(data).map( (produit) => {
  
    let article = document.createElement('article');
    article.id = "articlePanier";
    let nom = document.createElement('h3');
    nom.textContent = produit.name;
    let image = document.createElement('img');
    image.src =  produit.imageUrl;
    let div = document.createElement('div');
    div.id = "produit";
    let quantite = document.createElement('h4');
    quantite.textContent = "Quantité ";
    let qté = document.createElement('p');
    qté.textContent =  produit.qté;
    let prix = document.createElement('h4');
    prix.textContent = 'Prix '; 
    let price = document.createElement('p');
    price.textContent = produit.price;
    price.id = "price";  
    let supprime = document.createElement('button');
    supprime.textContent = "supprimer l'article";
    supprime.id = "supprime";
    
    
    // mise en place des éléments dans le DOM
  
    basket.appendChild(article);  
    article.appendChild(nom);                   
    article.appendChild(image);
    article.appendChild(div);         
    div.appendChild(quantite);
    div.appendChild(qté);
    div.appendChild(prix);
    div.appendChild(price);
    div.appendChild(supprime);
    
  }); 
}; 

    
// Fonction "supprimer le produit"
deleteButtons();
};
// Fonction "affichage panier" 
affichagePanier();

//  Suppression d'un article
function deleteButtons() {  
let deleteButtons = document.querySelectorAll('#supprime');
let nomProduit ;
let nombreTotalDeProduit = localStorage.getItem('qté');
nombreTotalDeProduit = parseInt(nombreTotalDeProduit);
let coutDuPanier = localStorage.getItem("prixTotal");
coutDuPanier = parseInt(coutDuPanier);
let data = JSON.parse(localStorage.getItem('panier'));

// Boucle For pour afficher les boutons "supprimer produits" autant de fois qu'il y a un article au panier

for(let i=0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', () => {
    // récupération du nom du produit pour plus tard
    nomProduit = deleteButtons[i].parentElement.parentElement.firstChild.innerText.trim();
    console.log(nomProduit);
    // récupération qté du produit pour calcul de la suppression
    qté = deleteButtons[i].parentElement.children[1].textContent;
    //conversion du string en number
    qté = parseInt(qté);
    // récupération du prix du produit pour calcul de la suppression
    let price = deleteButtons[i].parentElement.children[3].textContent;
     //conversion du string en number
    price = parseInt(price);
    //calcul de la qté dans le panier après suppression de l'article
    calculQte = nombreTotalDeProduit - qté;
    localStorage.setItem('qté', calculQte);
    //calcul du prix dans le panier après suppression de l'article
    calculPrice = coutDuPanier - qté * price;
    localStorage.setItem('prixTotal', calculPrice);
    // on supprime la ligne du produit correspondant au bouton supprimer
    delete data[nomProduit];

    // Alerte un article à été supprimé.
    alert('Vous avez supprimé '+ nomProduit + ' de votre panier ! ')
    // on actualise le LocalStorage et recharge la page pour une mise a jour
    localStorage.setItem('panier', JSON.stringify(data));
    window.location.reload();
  
    affichagePanier();
    chargementPanier(); 
   });
  }; 
};


// integration d'une alerte si le panier est vide, on ne peut pas passer commande  
let panier = localStorage.getItem('panier');
panier = JSON.parse(panier);
var total = localStorage.getItem('prixTotal');
if (panier == null || total == 0){
alert("Votre panier est vide, vous ne pouvez pas passer une commande ! ")
}  
const cart = document.querySelector("#cart"); // Récupère la section du panier
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  
};

   const containNumber = /[0-9]/;
   const regexEmail = /.+@.+\..+/;
   const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;
   
   const isNotEmpty = (value) => (value !== "" ? true : false); // Vérifie que la valeur donnée ne soit pas vide
   const isLongEnough = (value) => (value.length >= 2 ? true : false); // Vérifie que la valeur donnée ait assez de caractère
   const doNotContainNumber = (value) =>
     !value.match(containNumber) ? true : false; // Vérifie que la valeur donnée ne possède pas de chiffre
   const doNotContainSpecialCharacter = (value) =>
     !value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole
   const isValidEmail = (value) => (value.match(regexEmail) ? true : false); // Vérifie que la valeur donnée soit bien dans le format email
   
   const isValidInput = (value) =>
     isNotEmpty(value) &&
     isLongEnough(value) &&
     doNotContainNumber(value) &&
     doNotContainSpecialCharacter(value); // renvoie true si toutes les conditions sont vérifiées
   
   // Récupère les éléments du formulaire
   const firstName = form.elements.firstName;
   const lastName = form.elements.lastName;
   const address = form.elements.address;
   const city = form.elements.city;
   const email = form.elements.email;
   const btn = document.getElementById("btn");
   
   const firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
   const lastNameErrorMessage = document.getElementById("lastNameErrorMessage");
   const addressErrorMessage = document.getElementById("addressErrorMessage");
   const cityErrorMessage = document.getElementById("cityErrorMessage");
   const emailErrorMessage = document.getElementById("emailErrorMessage");
   
   //Permet de vérifier les saisies utilisateurs
   const formValidate = () => {
     if (isValidInput(firstName.value)) {
       firstNameErrorMessage.textContent = "";
   
       if (isValidInput(lastName.value)) {
         lastNameErrorMessage.textContent = "";
   
         if (isNotEmpty(address.value) && isLongEnough(address.value)) {
           addressErrorMessage.textContent = "";
   
           if (isValidInput(city.value)) {
             cityErrorMessage.textContent = "";
   
             if (isValidEmail(email.value)) {
               emailErrorMessage.textContent = "";
   
               return (cartInformation.contact = {
                 // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation
                 firstName: firstName.value,
                 lastName: lastName.value,
                 address: address.value,
                 city: city.value,
                 email: email.value,
               });
             } else {
               emailErrorMessage.textContent =
                 "Merci de renseigner votre adresse mail !";
               email.focus();
               return false;
             }
           } else {
             cityErrorMessage.textContent = "Merci de renseigner votre ville !";
             city.focus();
             return false;
           }
         } else {
           addressErrorMessage.textContent = "Merci de renseigner votre adresse !";
           address.focus();
           return false;
         }
       } else {
         lastNameErrorMessage.textContent = " Merci de renseigner votre nom !";
         lastName.focus();
         return false;
       }
     } else {
       firstNameErrorMessage.textContent = "Merci de renseigner votre prénom !";
       firstName.focus();
       return false;
     }
   };
   // Envoie données à l'api
   const postData = async (method, url, dataElt) => {
     const response = await fetch(url, {
       headers: {
         "Content-Type": "application/json"
       },
       method,
       body: JSON.stringify(dataElt),
     });
     return await response.json();
   };
   
   btn.addEventListener("click", async (e) => {
     e.preventDefault();
     const validForm = formValidate(); // Valide le formulaire
     if (validForm !== false) {
       const response = await postData(
         "POST",
         "http://localhost:3000/api/furniture/order",
         cartInformation
       ); // Envoie données au serveur
       window.location = `./confirmation.html?id=${response.orderId}&price=${prixTotal}&user=${firstName.value}`; // Redirige vers la page de confirmation de commande
       localStorage.removeItem("panier");
     }
   });
   
   if (!localStorage.getItem("panier")) {
     // vérifie que la localstorage est vide, si il est vide on cache le formulaire et on insère le texte
     cart.textContent = "Merci de mettre un article dans votre panier pour passer commande.";
     form.classList.add("invisible");
   }})}