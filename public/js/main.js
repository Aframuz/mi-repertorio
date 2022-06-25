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
   // Get song data
   const songToUpdate = songs.find((song) => song.id == id)
   // Change input values with song data
   elements.setInputValues(songToUpdate)

   // If a song hasn't been prepared before, show edit/cancel buttons
   if (!editMode) {
      elements.btnsToggleEdit()
      editMode = true
   }

   // Set eventListener
   elements.btnsSetEdit(editSong, id)
   // scroll to top
   window.scrollTo(0, 0)
}

// Populate table with Songs
const createTable = (tbody, arr) => {
   // Clean table body & create Fragment
   tbody.innerHTML = ""
   const tbodFrag = new DocumentFragment()

   // For each song, create a ROW and append it to Fragment
   arr.forEach((e, i) => {
      const tr = createTableRow(e, i)
      tbodFrag.appendChild(tr)
   })

   // Append Fragment to the table body & return tbody
   tbody.appendChild(tbodFrag)
   return tbody
}

// Populate table row with song data
const createTableRow = (obj, index) => {
   // Create a table row element, set data-id attribute & create a Fragment
   const tr = document.createElement("tr")
   tr.setAttribute("data-id", obj.id)
   const trFragment = new DocumentFragment()

   // For each song property, create a CELL with the property value as textContent & append it to Fragment
   for (const [key, value] of Object.entries(obj)) {
      const td = document.createElement("td")
      // If property is the song ID use a index instead
      td.textContent = key === "id" ? index + 1 : value
      trFragment.appendChild(td)
   }

   // Append Fragment to table row, append Buttons to table row & return tr
   tr.appendChild(trFragment)
   tr.appendChild(createTableBtns())
   return tr
}

// Create table buttons, edit & delete
const createTableBtns = () => {
   // Create a new table CELL & create a Fragment
   const td = document.createElement("td")
   const tdFrag = new DocumentFragment()

   // Append both edit & delete buttons to Fragment
   tdFrag.appendChild(createTableBtn("edit"))
   tdFrag.appendChild(createTableBtn("delete"))

   // Append Fragment to cell & return td
   td.appendChild(tdFrag)
   return td
}

// Create a single button
const createTableBtn = (type) => {
   // create a Button element
   const btn = document.createElement("button")

   // Buttons options, depending of type
   const opt = {
      edit: {
         text: "Editar",
         styles: ["btn-warning"],
         cb: (id) => prepareSong(id),
      },
      delete: {
         text: "Eliminar",
         styles: ["btn-danger"],
         cb: (id) => deleteSong(id),
      },
   }

   // Add textContent & classes (Bootstrap)
   btn.textContent = opt[type].text
   btn.classList.add("btn", "mx-1", ...opt[type].styles)
   // Add eventListener with data-id from corresponding tr
   btn.addEventListener("click", (e) => {
      const id = e.target.parentNode.parentNode.dataset.id
      opt[type].cb(id)
   })

   // return button element
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
   elements.btnsInit(addSong)
}

window.onload = init()
