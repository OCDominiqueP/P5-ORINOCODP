productId(products);


// Récupérer la valeur des champs saisis par le client
   
  let firstName = document.getElementById('firstname').value;
  let lastName = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;

// on met les valeurs dans un objet pour la requete POST

  let contact = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "address": address,
      "city": city,
  };

// création de l'objet obligatoire pour la requete à envoyer au serveur
let objt = {
  contact,
  products
};

let achat = JSON.stringify(objt);
// console.log(achat);
// console.log(products);

//afficher une alerte si il manque un renseignement et enregistrer les données dans le localStorage
var prenom = document.getElementById('firstname');
var oublisPrenom = document.getElementById('oublisPrenom');
var prenomValid = /^[a-zA-Z ,.'-]+$/;

var nom = document.getElementById('name');
var oublisNom = document.getElementById('oublisNom');
var nomValid = /^[a-zA-Z ,.'-]+$/;

var mail = document.getElementById('email');
var oublisEmail = document.getElementById('oublisEmail');
var mailValid = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;

var adresse = document.getElementById('address');
var oublisAdress = document.getElementById('oublisAdress');
var adresseValid = /[0-9a-zA-Z]{1,3}[a-z ,.'-]+$/;

var ville = document.getElementById('city');
var oublisVille = document.getElementById('oublisVille');
var villeValid = /^^[a-zA-Z ,.'-]+$/;

if (prenomValid.test(prenom.value) == false){
  oublisPrenom.textContent = "Format de votre prénom incorrect";
  oublisPrenom.style.color = 'red';
  return event.preventDefault();

} else if (nomValid.test(nom.value) == false){
  oublisNom.textContent = "Format de votre nom incorrect";
  oublisNom.style.color = 'red';
  return event.preventDefault();

} else if (mailValid.test(mail.value) == false){
  oublisEmail.textContent = "Format de votre e-mail incorrect";
  oublisEmail.style.color = 'red';
  return event.preventDefault();

} else if (adresseValid.test(adresse.value) == false){
  oublisAdress.textContent = "Format de votre adresse incorrect";
  oublisAdress.style.color = 'red';
  return event.preventDefault();

} else if (villeValid.test(ville.value) == false){
  oublisVille.textContent = "Format de votre ville incorrect";
  oublisVille.style.color = 'red';
  return event.preventDefault();

} else if (panier == null || total == 0){
  return event.preventDefault();

} else {
// si tout à été bien rempli, on envoi la commande au serveur, avec toutes les coordonnées du client
let request = new XMLHttpRequest();
     request.onreadystatechange = function () {
       if (this.readyState == XMLHttpRequest.DONE) {
         let confirmation = JSON.parse(this.responseText);
         sessionStorage.setItem('order', JSON.stringify(confirmation));
         let prix = JSON.parse(localStorage.getItem('prixTotal'));
         sessionStorage.setItem('prix', JSON.stringify(prix));
        console.log(typeof prix);
        console.log( prix);
         //Des que la requete est envoyé, on bascule sur la page de confirmation de commande avec toutes les infos demandé : Id de commande, prix du panier
         window.location.href = "commande.html";
       }
     };
request.open("post", "http://localhost:3000/api/furniture/order");
request.setRequestHeader("Content-Type", "application/json");
request.send(achat);
} 