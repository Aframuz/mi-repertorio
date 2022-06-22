const url = "/songs"

const tbody = document.getElementById("table-body")
const songInput = document.getElementById("song")
const artistInput = document.getElementById("artist")
const chordInput = document.getElementById("chord")

const songs = []

const getData = async () => {
   // Get Songs
   const res = await fetch(url)
   const songs = await res.json()
   console.log(songs)

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
      editBtn.setAttribute("onclick", `prepareSong(${i}, ${song.id})`)
      editBtn.textContent = "Editar"
      btnsFrag.appendChild(editBtn)

      const deleteBtn = document.createElement("button")
      deleteBtn.classList.add("btn", "btn-danger")
      deleteBtn.setAttribute("onclick", `deleteSong(${i}, ${song.id})`)
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

const addSong = async () => {
   const songData = {
      titulo: songInput.value,
      artista: artistInput.value,
      tono: chordInput.value,
   }
   const options = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
   }

   try {
      const res = await fetch(url, options)
      const { id } = await res.json()
      console.log(`Inserted Song ${id}`)
      getData()
   } catch (error) {
      console.log(error)
   }
}
