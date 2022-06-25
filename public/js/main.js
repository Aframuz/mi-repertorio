/*=============================================
=               IMPORT MODULES                =
=============================================*/
import fetchData from "./fetch.js"
import elements from "./dom-elements.js"

/*=============================================
=              GLOBAL VARIABLES               =
=============================================*/
const url = "/songs"
let editMode = false

let songs = []

/*=============================================
=                FETCH METHODS                =
=============================================*/
// Get Songs
const getSongs = async () => {
   // GET songs in DB
   const songs = await fetchData(url, "GET")
   return songs
}
// Add a song to the table with the values in input
const addSong = async () => {
   // Get input values
   const songData = elements.getInputValues()
   // POST song into DB using fetch
   await fetchData(url, "POST", songData)
   // Front reset
   init()
}

// Delete a song from the table
const deleteSong = async (songId) => {
   // DELETE song in DB using fetch
   await fetchData(`${url}/${songId}`, "DELETE")
   // Front reset
   init()
}

// Edit a song from the table
const editSong = async (songId) => {
   // Getting song data from input
   const songData = elements.getInputValues()
   // PUT song in DB using fetch
   await fetchData(`${url}/${songId}`, "PUT", songData)
   // Front reset
   init()
}

/*=============================================
=              DOM MANIPULATION              =
=============================================*/
// Copy corresponding data from table to inputs, change button display accordingly
const prepareSong = (id) => {
   const songToUpdate = songs.find((song) => song.id == id)

   elements.setInputValues(songToUpdate)

   if (!editMode) {
      elements.btnsToggleEdit()
      editMode = true
   }

   elements.btnsSetEdit(editSong, id, editMode)

   window.scrollTo(0, 0)
}

const createTable = (tbody, arr) => {
   tbody.innerHTML = ""
   const tbodFrag = new DocumentFragment()

   arr.forEach((e, i) => {
      const tr = createTableRow(e, i)
      tbodFrag.appendChild(tr)
   })

   tbody.appendChild(tbodFrag)
   return tbody
}

const createTableRow = (obj, index) => {
   const tr = document.createElement("tr")
   tr.setAttribute("data-id", obj.id)
   const trFragment = new DocumentFragment()

   for (const [key, value] of Object.entries(obj)) {
      const td = document.createElement("td")
      td.textContent = key === "id" ? index + 1 : value
      trFragment.appendChild(td)
   }

   tr.appendChild(trFragment)
   tr.appendChild(createTableBtns())

   return tr
}

const createTableBtns = () => {
   const td = document.createElement("td")
   const tdFrag = new DocumentFragment()

   tdFrag.appendChild(createTableBtn("edit"))
   tdFrag.appendChild(createTableBtn("delete"))

   td.appendChild(tdFrag)

   return td
}

const createTableBtn = (type) => {
   const btn = document.createElement("button")

   const opt = {
      edit: {
         text: "Editar",
         cb: (id) => prepareSong(id),
      },
      delete: {
         text: "Eliminar",
         cb: (id) => deleteSong(id),
      },
   }

   btn.textContent = opt[type].text
   btn.addEventListener("click", (e) => {
      const id = e.target.parentNode.parentNode.dataset.id
      opt[type].cb(id)
   })

   return btn
}

/*=============================================
=                     INIT                    =
=============================================*/
const init = async () => {
   // Get Songs
   songs = await getSongs()

   // Clean table from [songs]
   createTable(elements.tbody, songs)

   // Clear inputs
   elements.cleanInputValues()

   // btns
   elements.btnsInit(addSong, editMode)
}

window.onload = init()
