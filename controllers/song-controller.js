/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const db = require("../models/song")

/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get all songs in DB
const getSongs = async (req, res) => {
   try {
      const songs = await db.getSongs()
      res.status(200).json(songs)
   } catch (err) {
      console.error(`Error getting songs!\n${err}`)
      res.status(500).send(`Error getting songs`)
   }
}

// Inserting song
const addSong = async (req, res) => {
   // Get song data from request body
   const songObj = req.body

   try {
      const insertedSong = await db.insertSong(songObj)
      res.status(201).json(insertedSong)
   } catch (err) {
      console.error(`Error adding song!\n${err}`)
      res.status(500).send("Error adding song")
   }
}

// Updating a song
const updateSong = async (req, res) => {
   // Constructign song from request parameters & body
   const newSongObj = {
      id: req.params.id,
      ...req.body,
   }

   try {
      const updatedSong = await db.updateSong(newSongObj)
      res.status(200).json(updatedSong)
   } catch (err) {
      console.error(`Error updating song!\n${err}`)
      res.status(500).send("Error updating song")
   }
}

// Deleting a song
const deleteSong = async (req, res) => {
   // Getting song ID from request parameters
   const songId = req.params.id

   try {
      const deletedSong = await db.deleteSong(songId)
      res.status(200).json(deletedSong)
   } catch (err) {
      console.error(`Error deleting song!\n${err}`)
      res.status(500).send("Error deleting song")
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getSongs,
   addSong,
   updateSong,
   deleteSong,
}
