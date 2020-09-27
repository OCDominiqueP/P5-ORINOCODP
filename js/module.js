function chargementPanier() {
    let nombreProduit = localStorage.getItem('qté');

    if (nombreProduit) {
        document.querySelector('.totalQté').textContent = nombreProduit;
    } else {
        document.querySelector('.totalQté').textContent = 0;
    }
}