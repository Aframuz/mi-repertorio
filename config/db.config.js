/*=============================================
=               IMPORT MODULES                =
=============================================*/
const { Pool } = require("pg")
require("dotenv").config()

/*=============================================
=                    INIT                     =
=============================================*/

const pool = new Pool()

/*=============================================
=                   EVENTS                    =
=============================================*/
// On Error
pool.on("error", (err, client) => {
   console.error(`Unexpected error on idle client`, err)
   process.exit(-1)
})
// On Connect
pool.on("connect", () => {
   console.log("connected to the database!")
})

/*=============================================
=                   METHODS                   =
=============================================*/
const query = async (queryConf) => {
   const client = await pool.connect()
   try {
      const res = await client.query(queryConf)
      return res
   } finally {
      client.release()
   }
}

module.exports = {
   query,
}
