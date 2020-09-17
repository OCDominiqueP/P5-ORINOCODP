// On attend que le document soit chargé
window.onload = () => {
    // Ici le document est chargé
    const idproduits = window.location.search.substring(4);
  
    fetch("http://localhost:3000/api/furniture/" + idproduits)
      .then((res) => res.json())
      .then((data) => {
  
        produit = data;
  
        // Création du HTML
        let bloc = document.createElement("article");
        let blocPhoto = document.createElement("div");
        let imageArticle = document.createElement("img");
        let blocDescription = document.createElement("div");
        let blocGauche = document.createElement("div");
        let nomArticle = document.createElement("p");
        let description = document.createElement("p");
        let blocDroit = document.createElement("div");
        let prix = document.createElement("p");
        let couleur = document.createElement("select");
        let ajoutPanier = document.createElement ('button');
        let voirPanier = document.createElement('button');
        let label = document.createElement('label');       
      
        // Attribution des classes
        bloc.setAttribute("class", "article");
        blocPhoto.setAttribute("class", "bloc_photo");
        imageArticle.setAttribute("class", "img_article");
        blocDescription.setAttribute("class", "bloc_description");
        blocGauche.setAttribute("class", "bloc_gauche");
        nomArticle.setAttribute("class", "texte_nom");
        description.setAttribute("class", "texte_description");
        blocDroit.setAttribute("class", "bloc_droit");
        prix.setAttribute("class", "price_article");
        couleur.setAttribute("id", "choix_couleur"); 
        ajoutPanier.setAttribute("id", "stockage");
        
  
        // Hiérarchie dans les éléments créés
        let sectionProduit = document.getElementById("product");
        sectionProduit.appendChild(bloc);
        bloc.appendChild(blocPhoto);
        blocPhoto.appendChild(imageArticle);
        bloc.appendChild(blocDescription);
        blocDescription.appendChild(blocGauche);
        blocGauche.appendChild(nomArticle);
        blocGauche.appendChild(description);
        blocDescription.appendChild(blocDroit);
        blocDroit.appendChild(prix);
        blocDroit.appendChild(label);
        blocDroit.appendChild(couleur);
        blocGauche.appendChild(ajoutPanier);
        
        // Remplissage du contenu des balises
        imageArticle.src = produit.imageUrl;
        nomArticle.textContent = produit.name;
        description.textContent = produit.description;
        prix.textContent = produit.price + ",00€";
        couleur.innerHTML = produit.varnish; 
        label.textContent = "Vernis "; 
        ajoutPanier.textContent = "Ajouter au panier";
        voirPanier.textContent = "Voir mon panier";
        
        
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
  
  // Menu déroulant des vernis par article
      let innerHTML = "<select id='select_color'>";
      for (value of produit.varnish) {
        innerHTML += "<option value='" + value + "'>" + value + "</option>";
      }
      innerHTML += " </select>";
      couleur.innerHTML = innerHTML;


  // on affiche l'article demandé à l'ouverture de la page produits
  
  let panier = localStorage.getItem('panier');
  panier = JSON.parse(panier);
  localStorage.setItem('panier', JSON.stringify(panier));
  chargementPanier(); 
  
  // bouton Ajout au panier
  ajoutPanier.addEventListener('click', function() {
  alert('Vous avez ajouté ' + produit.name + ' à votre panier')
  ajoutLocalStorage()
  nombreProduit()
  prixTotal()
  
  //Mise a jour du nombre de produit
  function nombreProduit(){  
  let nombreProduit = localStorage.getItem('qté');  
  nombreProduit = parseInt(nombreProduit);
      
    if (nombreProduit){
        localStorage.setItem("qté", nombreProduit + 1);
        document.querySelector ('.totalQté').textContent = nombreProduit + 1;
      } else{
        localStorage.setItem("qté", 1);
        document.querySelector ('.totalQté').textContent = 1;
      }
  } 

  //Mise a jour du nombre de produit dans l'objet "qté:" 
  function ajoutLocalStorage(){
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    produit.qté = 0;
      
      if(panier != null){
  
          if(panier[produit.name] === undefined) {
              panier = {...panier, [produit.name] : produit}
          }
          panier[produit.name].qté += 1;
      } else {
          panier = {[produit.name] : produit}
          panier[produit.name].qté += 1;
      }
      localStorage.setItem("panier", JSON.stringify(panier));
  }

  function prixTotal(){
    let price = parseInt(produit.price);
     let prixDuPanier = JSON.parse(localStorage.getItem('prixTotal'));
      
      if(prixDuPanier != null){
          localStorage.setItem("prixTotal", prixDuPanier + price);
      } else {
          localStorage.setItem("prixTotal", price);
      }
  }
     
      });
  });
  
      }