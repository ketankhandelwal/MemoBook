const express = require("express"); //Express.js
const router = express.Router(); // calling b/w API .
const Notes = require("../models/Notes"); // schema of Notes
const fetchUser = require("../middleware/fetchUser"); // middle ware that contain req.user
const { body, validationResult } = require("express-validator");

// API to fetch data of all the
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// API to add notes

router.post(
  "/addNotes",
  fetchUser,
  [body("title").exists(), body("tag").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { title, tag } = req.body; // deconstructive manner.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        // everytime user making new notes
        title,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save(); //saving to mongoDB

      res.json(saveNote); // showing on  Screen
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error");
    }
  }
);

//update request API

router.put("/updateNotes/:id", async (req, res) => {
  try {
    const { title, tag } = req.body; // deconstructive manner.
    const newNote = {}; //object
    if (title) {
      newNote.title = title;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id); //:id in API ...
    if (!note) {
      return res.status(404); // if no note is there
    }

    // if(note.user.toString() !== req.user.id){
    //     return res.status(401);
    // }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
  }
});

router.put("/updateNotes/:id", async (req, res) => {
  try {
    const { title, tag } = req.body; // deconstructive manner.
    const newNote = {}; //object
    if (title) {
      newNote.title = title;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id); //:id in API ...
    if (!note) {
      return res.status(404); // if no note is there
    }

    // if(note.user.toString() !== req.user.id){
    //     return res.status(401);
    // }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
  }
});

//delete notes from DB using user id

router.delete("/deleteNotes/:id", async (req, res) => {
  try {
    const { title, tag } = req.body; // deconstructive manner.

    let note = await Notes.findById(req.params.id); //:id in API ...
    if (!note) {
      return res.status(404).json({ error: "No Note" }); // if no note is there
    }

    // if(note.user.toString() !== req.user.id){
    //     return res.status(401);
    // }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
  }
});

module.exports = router;
