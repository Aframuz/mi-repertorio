/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get all songs in the DB
const getSongs = async () => {
   // Query configuration
   const queryConf = {
      text: "SELECT * FROM canciones",
   }

   try {
      const songs = await client.query(queryConf)
      return songs.rows
   } catch (err) {
      console.error(`error getting songs!\n${err}`)
   }
}

// Insert a song
const insertSong = async (songObj) => {
   // Query configuration
   const queryConf = {
      text: "INSERT INTO canciones(id, titulo, artista, tono) VALUES  (default, $1, $2, $3) RETURNING *",
      values: Object.values(songObj),
   }

   try {
      const res = await client.query(queryConf)
      console.log("Song added")
      return res.rows[0]
   } catch (err) {
      console.error(`error inserting song!\n${err}`)
   }
}

// Update a song
const updateSong = async (songObj) => {
   // Query configuration
   const queryConf = {
      text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
      values: Object.values(songObj),
   }

   try {
      const res = await client.query(queryConf)
      console.log("Song updated")
      return res.rows[0]
   } catch (err) {
      console.error(`error updating song!\n${err}`)
   }
}

// Delete a song
const deleteSong = async (songId) => {
   // Query configuration
   const queryConf = {
      text: "DELETE FROM canciones WHERE id = $1 RETURNING *",
      values: [songId],
   }

   try {
      const res = await client.query(queryConf)
      console.log("Song deleted")
      return res.rows[0]
   } catch (err) {
      console.error(`Error deleting song!\n${err}`)
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getSongs,
   insertSong,
   updateSong,
   deleteSong,
}
