/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const songController = require("../controllers/song-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
// routes for updating and deleting
router.route("/:id").put(songController.updateSong).delete(songController.deleteSong)

// routes for inserting and getting
router.route("/").post(songController.addSong).get(songController.getSongs)

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
