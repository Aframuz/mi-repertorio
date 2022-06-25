const elements = {
   // Table elements
   tbody: document.querySelector("#table-body"),
   // Buttons elements
   buttons: {
      addBtn: document.querySelector("#add"),
      editBtn: document.querySelector("#edit"),
      cancelBtn: document.querySelector("#cancel"),
   },
   // Inputs elements
   inputs: {
      titulo: document.querySelector("#song"),
      artista: document.querySelector("#artist"),
      tono: document.querySelector("#chord"),
   },

   /*=============================================
   =                   METHODS                   =
   =============================================*/
   // Return Object with input values
   getInputValues() {
      return Object.fromEntries(
         Object.entries(this.inputs).map(([k, v]) => [k, v.value])
      )
   },

   // Change input values with an object
   setInputValues(newSongObj) {
      for (const key in this.inputs) {
         this.inputs[key].value = newSongObj[key]
      }
   },

   // Change input values to empty strings
   cleanInputValues() {
      for (const key in this.inputs) {
         this.inputs[key].value = ""
      }
   },

   // Initialize main buttons settings
   btnsInit(fn) {
      // Remove previous EventListeners
      for (const key in this.buttons) {
         const btn = this.buttons[key]
         const cloneBtn = btn.cloneNode("true")
         btn.parentNode.replaceChild(cloneBtn, btn)
         this.buttons[key] = cloneBtn
      }
      // Add new event listeners
      this.buttons.addBtn.addEventListener("click", fn)
      this.buttons.cancelBtn.addEventListener("click", () => {
         elements.cleanInputValues()
         elements.btnsToggleEdit()
      })
      // Hide edit/cancel buttons via CSS
      this.buttons.editBtn.classList.add("hidden")
      this.buttons.cancelBtn.classList.add("hidden")
   },

   // Hide or Show ALL buttons via CSS
   btnsToggleEdit() {
      for (const key in this.buttons) {
         this.buttons[key].classList.toggle("hidden")
      }
   },

   // Change edit button event listener according to song ID
   btnsSetEdit(fn, id) {
      // Get current edit button, clone it
      const editBtn = this.buttons.editBtn
      const cloneBtn = editBtn.cloneNode("true")

      // Add event listener to clone
      cloneBtn.addEventListener("click", () => {
         fn(id)
         elements.btnsToggleEdit()
      })

      // Replace current button with clone
      editBtn.parentNode.replaceChild(cloneBtn, editBtn)
      this.buttons.editBtn = cloneBtn
   },
}

export default elements
