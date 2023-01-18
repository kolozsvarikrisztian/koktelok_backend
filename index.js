const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");
// });

// Read
app.get("/koktelok", (req, res) => {
  fs.readFile("./data/koktelok.json", (err, file) => {
    res.send(JSON.parse(file));
  });
});

// Read by name
app.get("/koktelok/:egyediAzonosito", (req, res) => {
  const name = req.params.egyediAzonosito;

  fs.readFile("./data/koktelok.json", (err, file) => {
    const koktelok = JSON.parse(file);
    const koktelByName = koktelok.find((koktel) => koktel.name === name);

    if (!koktelByName) {
      res.status(404);
      res.send({ error: `name: ${name} not found` });
      return;
    }

    res.send(koktelByName);
  });
});

// Create
app.post("/koktelok", bodyParser.json(), (req, res) => {
  const newKoktel = {
    name: req.body.name,
    // name: sanitizeString(req.body.name),
    photoUrl: req.body.photoUrl,
    description: req.body.description,
    osszetevok: req.body.osszetevok,
    elkeszites: req.body.elokeszites,
    szervirozas: req.body.szervirozas,
    forras: req.body.forras
  };

  fs.readFile("./data/koktelok.json", (err, file) => {
    const koktelok = JSON.parse(file);
    koktelok.push(newKoktel);
    fs.writeFile("./data/koktelok.json", JSON.stringify(koktelok), (err) => {
      res.send(newKoktel);
    });
  });
});

// Update
app.put("/koktelok/:egyediAzonosito", bodyParser.json(), (req, res) => {
  const name = req.params.egyediAzonosito;

  fs.readFile("./data/koktelok.json", (err, file) => {
    const koktelok = JSON.parse(file);
    const koktelIndexById = koktelok.findIndex((koktel) => koktel.name === name);

    if (koktelIndexById === -1) {
      res.status(404);
      res.send({ error: `id: ${id} not found` });
      return;
    }

    const updatedKoktel = {
        name: req.body.name,
        // name: sanitizeString(req.body.name),
        photoUrl: req.body.photoUrl,
        description: req.body.description,
        osszetevok: req.body.osszetevok,
        elkeszites: req.body.elokeszites,
        szervirozas: req.body.szervirozas,
        forras: req.body.forras
    };

    koktelok[koktelIndexById] = updatedKoktel;
    fs.writeFile("./data/koktelok.json", JSON.stringify(koktelok), () => {
      res.send(updatedKoktel);
    });
  });
});

// Delete
app.delete("/koktelok/:egyediAzonosito", (req, res) => {
  const name = req.params.egyediAzonosito;

  fs.readFile("./data/koktelok.json", (err, file) => {
    const koktelok = JSON.parse(file);
    const koktelIndexById = koktelok.findIndex((koktel) => koktel.name === name);

    if (koktelIndexById === -1) {
      res.status(404);
      res.send({ error: `name: ${name} not found` });
      return;
    }

    koktelok.splice(koktelIndexById, 1);
    fs.writeFile("./data/koktelok.json", JSON.stringify(koktelok), () => {
      res.send({ name: name });
    });
  });
});

app.listen(9000);

// function sanitizeString(str) {
//     str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
//     return str.trim();
// }