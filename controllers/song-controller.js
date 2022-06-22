/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const db = require("../models/song")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const getSongs = async (req, res) => {
   const songs = await db.getSongs()
   res.status(200).json(songs)
}

const addSong = async (req, res) => {
   const songObj = req.body

   const insertedSong = await db.insertSong(songObj)
   res.status(201).json(insertedSong)
}

const updateSong = async (req, res) => {
   const songId = req.params.id
   const newSongObj = req.body

   const updatedSong = await db.updateSong(newSongObj)
   res.status(200).json(updatedSong)
}

const deleteSong = async (req, res) => {
   const songId = req.params.id // or body??

   const deletedSong = await db.deleteSong(songId)
   res.status(200).json(deletedSong)
}

module.exports = {
   getSongs,
   addSong,
   updateSong,
   deleteSong,
}
