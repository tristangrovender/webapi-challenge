// Import Express
const express = require('express');

// Import Router
const router = express.Router();

// Import Post db
const db = require('../../data/helpers/actionModel');

// Endpoints Go Here

// Create
router.post("/", (req, res) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      res
        .status(400)
        .json({ errorMessage: "Please provide a project id, description, and notes." });
    }
    db.insert({ project_id, description, notes })
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the action to the database."
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
        res.status(500).json({ error: "The actions could not be retrieved" });
      });
  });
  
   router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(resp => {
        if (resp.length === 0) {
          res.status(404).json({ message: "Action does not exists." });
        }
        res.status(200).json(resp);
      })
      .catch(err => {
        res.status(500).json({ error: "Action info could not be retrieved." });
      });
  });

  

// Update
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      res.status(400).json({ error: "Please provide project id, description, and notes." });
    }
    db.update(id, { project_id, description, notes })
      .then(changes => {
        if (changes.length === 0) {
          res.status(404).json({ message: "Action does not exists." });
        }
        res.status(200).json(changes);
      })
      .catch(err => {
        res.status(500).json({ error: "The action info could not be modified." });
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