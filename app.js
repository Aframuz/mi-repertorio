/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party modules
const express = require("express")
require("dotenv").config()
// Local modules
// Core modules
const path = require("path")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const PORT = process.env.PORT || 3000
const app = express()

/*=============================================
=         MIDDLEWARE & APP SETTINGS           =
=============================================*/
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "pug")

/*=============================================
=                   ROUTES                    =
=============================================*/
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
