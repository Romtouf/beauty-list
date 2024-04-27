document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form-ajout-produit")
    .addEventListener("submit", submitForm);
  chargerProduits();
});

function submitForm(event) {
  event.preventDefault();
  const nomProduit = document.getElementById("nom-produit").value;
  const marqueProduit = document.getElementById("marque-produit").value;
  const qualiteProduit = document.getElementById("qualite-produit").value;

  if (
    nomProduit.trim() === "" ||
    marqueProduit === "" ||
    qualiteProduit === ""
  ) {
    alert("Veuillez remplir tous les champs avant de soumettre.");
    return;
  }

  const produit = {
    nom: nomProduit,
    marque: marqueProduit,
    qualite: qualiteProduit,
  };
  sauvegarderProduit(produit);
  chargerProduits();
  document.getElementById("form-ajout-produit").reset();
}

function sauvegarderProduit(produit) {
  let produits = JSON.parse(localStorage.getItem("produits") || "[]");
  produits.push(produit);
  localStorage.setItem("produits", JSON.stringify(produits));
}

function chargerProduits() {
  const produits = JSON.parse(localStorage.getItem("produits") || "[]");
  const produitsContainer = document.getElementById("produits-container");
  produitsContainer.innerHTML = "";
  produits.forEach((produit, index) => afficherProduit(produit, index));
}

function afficherProduit(produit, index) {
  const produitsContainer = document.getElementById("produits-container");
  const produitDiv = document.createElement("div");
  produitDiv.classList.add("produit");
  produitDiv.innerHTML = `
        <p>${produit.nom} (${produit.marque}) - ${convertirQualiteEnEtoiles(
    produit.qualite
  )}</p>
        <button onclick="supprimerProduit(${index})">Supprimer</button>
        <button onclick="editerProduit(${index})">Éditer</button>
    `;
  produitsContainer.appendChild(produitDiv);
}

function supprimerProduit(index) {
  let produits = JSON.parse(localStorage.getItem("produits"));
  produits.splice(index, 1);
  localStorage.setItem("produits", JSON.stringify(produits));
  chargerProduits();
}

function editerProduit(index) {
  const produit = JSON.parse(localStorage.getItem("produits"))[index];
  document.getElementById("nom-produit").value = produit.nom;
  document.getElementById("marque-produit").value = produit.marque;
  document.getElementById("qualite-produit").value = produit.qualite;
  document.getElementById("form-ajout-produit").onsubmit = function (event) {
    event.preventDefault();
    mettreAJourProduit(index);
  };
}

function mettreAJourProduit(index) {
  const nomProduit = document.getElementById("nom-produit").value;
  const marqueProduit = document.getElementById("marque-produit").value;
  const qualiteProduit = document.getElementById("qualite-produit").value;

  let produits = JSON.parse(localStorage.getItem("produits"));
  produits[index] = {
    nom: nomProduit,
    marque: marqueProduit,
    qualite: qualiteProduit,
  };
  localStorage.setItem("produits", JSON.stringify(produits));
  chargerProduits();
  document.getElementById("form-ajout-produit").reset();
  document.getElementById("form-ajout-produit").onsubmit = submitForm; // Reset the form submission to default behavior
}

function convertirQualiteEnEtoiles(qualite) {
  const etoiles = ["☆☆☆☆☆", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];
  return etoiles[parseInt(qualite, 10)];
}
