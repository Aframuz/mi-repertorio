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
router
   .route("/:id")
   .put(songController.updateSong)
   .delete(songController.deleteSong)

router.route("/").post(songController.addSong).get(songController.getSongs)

module.exports = router
