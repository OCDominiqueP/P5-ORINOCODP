const orderproduit = window.location.search.substr(1).split("&");
const orderId = orderproduit[0].replace("id=", "");
const prixTotal = orderproduit[1].replace("price=", "");
const userName = orderproduit[2].replace("user=", "");
console.log((document.querySelector(".user").textContent += " " + userName));
console.log((document.querySelector(".order-id").textContent += " " + orderId));
console.log((document.querySelector(".price").textContent += " " + prixTotal));

localStorage.clear();