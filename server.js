// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Import du module cors

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors()); // Utilisation du middleware cors pour permettre les requêtes provenant de différentes origines

// Endpoint pour mettre à jour le fichier JSON
app.post("/update-json", (req, res) => {
  const data = req.body;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la mise à jour du fichier");
    } else {
      res.send("Fichier mis à jour avec succès");
    }
  });
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

// lancer node server.js dans le terminal pour start
