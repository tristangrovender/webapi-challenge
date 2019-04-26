// Import Express
const express = require('express');

// Import Router
const router = express.Router();

// Import Post db
const db = require('../../data/helpers/projectModel');

// Endpoints Go Here

// Create
router.post("/", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res
        .status(400)
        .json({ errorMessage: "Please provide a name and description" });
    }
    db.insert({ name, description })
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the project to the database."
        });
      });
  });

// Read
  router.get("/", (req, res) => {
    db.get()
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(err => {
        res.status(500).json({ error: "The project could not be retrieved" });
      });
  });
  
   router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(resp => {
        if (resp.length === 0) {
          res.status(404).json({ message: "Project does not exists." });
        }
        res.status(200).json(resp);
      })
      .catch(err => {
        res.status(500).json({ error: "Project info could not be retrieved." });
      });
  });

// Update
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ error: "Please provide name and description." });
    }
    db.update(id, { name, description })
      .then(changes => {
        if (changes.length === 0) {
          res.status(404).json({ message: "Project does not exists." });
        }
        res.status(200).json(changes);
      })
      .catch(err => {
        res.status(500).json({ error: "The project info could not be modified." });
      });
  });

// Delete
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(action => {
        if (action === 0) {
          res.status(404).json({ error: "The action with the id does not exist" });
        }
        res.status(204).end();
      })
      .catch(err => {
        res.status(500).json({ error: "The action could not be removed" });
      });
  });

 //Export Router 
module.exports = router;