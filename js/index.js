// On attend que le document soit chargé
window.onload = () => {
    // Ici le document est chargé


    fetch("http://localhost:3000/api/furniture/")
        .then((res) => res.json())
        .then((data) => {

            let sectionProduit = document.getElementById("produits");
            data.forEach(function(produit) {

                    //Mise a jour du nombre de produit dans l'onglet panier

                    chargementPanier();

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
                    let lienArticle = document.createElement("a");

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
                    lienArticle.setAttribute("href", "produits.html?id=" + produit._id);
                    lienArticle.setAttribute("class", "selection_article");

                    // Remplissage du contenu des balises
                    imageArticle.src = produit.imageUrl;
                    nomArticle.textContent = produit.name;
                    description.textContent = produit.description;
                    prix.textContent = produit.price / 100 + " €";
                    lienArticle.textContent = "Séléctionner";

                    // Hiérarchie dans les éléments créés
                    sectionProduit.appendChild(bloc);
                    bloc.appendChild(blocPhoto);
                    blocPhoto.appendChild(imageArticle);
                    bloc.appendChild(blocDescription);
                    blocDescription.appendChild(blocGauche);
                    blocGauche.appendChild(nomArticle);
                    blocGauche.appendChild(description);
                    blocDescription.appendChild(blocDroit);
                    blocDroit.appendChild(prix);
                    blocDroit.appendChild(lienArticle);

                }

            );
        })
}