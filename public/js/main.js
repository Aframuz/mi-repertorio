/*=============================================
=               IMPORT MODULES                =
=============================================*/
// import fetchData from "./fetch.js"
/*=============================================
=              GLOBAL VARIABLES               =
=============================================*/
const url = "/songs"

const tbody = document.getElementById("table-body")
const songInput = document.getElementById("song")
const artistInput = document.getElementById("artist")
const chordInput = document.getElementById("chord")

let songs = []

/*=============================================
=                     INIT                    =
=============================================*/
const getData = async () => {
   // Get Songs
   const res = await fetch(url)
   songs = await res.json()

   // Clean table, create fragment
   tbody.innerHTML = ""
   const tbodFrag = new DocumentFragment()
   // Insert Songs
   songs.forEach((song, i) => {
      const tr = document.createElement("tr")
      const trFrag = new DocumentFragment()
      for (const [key, value] of Object.entries(song)) {
         const td = document.createElement("td")
         td.textContent = key === "id" ? i + 1 : value
         trFrag.appendChild(td)
      }

      const btnsTd = document.createElement("td")
      const btnsFrag = new DocumentFragment()

      const editBtn = document.createElement("button")
      editBtn.classList.add("btn", "btn-warning")
      editBtn.setAttribute("onclick", `prepareSong(${song.id})`)
      editBtn.textContent = "Editar"
      btnsFrag.appendChild(editBtn)

      const deleteBtn = document.createElement("button")
      deleteBtn.classList.add("btn", "btn-danger")
      deleteBtn.setAttribute("onclick", `deleteSong(${song.id})`)
      deleteBtn.textContent = "Eliminar"
      btnsFrag.appendChild(deleteBtn)

      btnsTd.appendChild(btnsFrag)

      tr.appendChild(trFrag)
      tr.appendChild(btnsTd)
      tbodFrag.appendChild(tr)
   })
   tbody.appendChild(tbodFrag)

   // Clear inputs
   songInput.value = ""
   artistInput.value = ""
   chordInput.value = ""
}

window.onload = getData()

/*=============================================
=                FETCH METHODS                =
=============================================*/
// Add a song to the table with the values in input
const addSong = async () => {
   // Get input values
   const songData = {
      titulo: songInput.value,
      artista: artistInput.value,
      tono: chordInput.value,
   }

   await fetchData(url, "POST", songData)
   // // Fetch options
   // const options = {
   //    method: "POST",
   //    headers: {
   //       "Content-Type": "application/json",
   //    },
   //    body: JSON.stringify(songData),
   // }
   // // Trying to fetch, then load table data
   // try {
   //    const res = await fetch(url, options)
   //    const { id } = await res.json()
   //    console.log(`Inserted song ${id}`)
   //    getData()
   // } catch (error) {
   //    console.log(error)
   // }
}

// Delete a song from the table
const deleteSong = async (songId) => {
   // Fetch options
   const options = {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json; charset=UTF-8",
      },
   }

   // Trying to fetch, then load table data
   try {
      const res = await fetch(`${url}/${songId}`, options)
      const { id } = await res.json()
      console.log(`Deleted song ${id}`)
      getData()
   } catch (err) {
      console.error(`Error deleting song!\n${err}`)
   }
}

// Copy corresponding data from table to inputs, change button display accordingly
const prepareSong = (id) => {
   const songToUpdate = songs.find((song) => song.id === id)

   songInput.value = songToUpdate.titulo
   artistInput.value = songToUpdate.artista
   chordInput.value = songToUpdate.tono

   const editBtn = document.getElementById("edit")
   const addBtn = document.getElementById("add")

   editBtn.setAttribute("onclick", `editSong(${id})`)

   addBtn.style.display = "none"
}

// Edit a song from the table
const editSong = async (songId) => {
   // Getting song data from input
   const songData = {
      titulo: songInput.value,
      artista: artistInput.value,
      tono: chordInput.value,
   }
   // Fetch options
   const options = {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
   }

   // Trying to fetch, then load table data
   try {
      const res = await fetch(`${url}/${songId}`, options)
      const { id } = await res.json()
      console.log(`Updated song ${id}`)
      getData()
   } catch (err) {
      console.log(`Error updating song!\n${err}`)
   }
}
