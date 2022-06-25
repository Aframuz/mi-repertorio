const elements = {
   buttons: {
      addBtn: document.querySelector("#add"),
      editBtn: document.querySelector("#edit"),
      cancelBtn: document.querySelector("#cancel"),
   },
   tbody: document.querySelector("#table-body"),
   inputs: {
      titulo: document.querySelector("#song"),
      artista: document.querySelector("#artist"),
      tono: document.querySelector("#chord"),
   },
   getInputValues() {
      return Object.fromEntries(
         Object.entries(this.inputs).map(([k, v]) => [k, v.value])
      )
   },
   setInputValues(newSongObj) {
      for (const key in this.inputs) {
         this.inputs[key].value = newSongObj[key]
      }
   },
   cleanInputValues() {
      for (const key in this.inputs) {
         this.inputs[key].value = ""
      }
   },
   btnsInit(fn, eMode) {
      // Remove previous EventListeners
      for (const key in this.buttons) {
         const btn = this.buttons[key]
         const cloneBtn = btn.cloneNode("true")
         btn.parentNode.replaceChild(cloneBtn, btn)
         this.buttons[key] = cloneBtn
      }

      this.buttons.addBtn.addEventListener("click", fn)
      this.buttons.cancelBtn.addEventListener("click", () => {
         elements.cleanInputValues()
         elements.btnsToggleEdit()
         eMode = false
      })
      this.buttons.editBtn.classList.add("hidden")
      this.buttons.cancelBtn.classList.add("hidden")
   },
   btnsToggleEdit() {
      for (const key in this.buttons) {
         this.buttons[key].classList.toggle("hidden")
      }
   },

   btnsSetEdit(fn, id, eMode) {
      const editBtn = this.buttons.editBtn
      const cloneBtn = editBtn.cloneNode("true")
      cloneBtn.addEventListener("click", () => {
         fn(id)
         elements.btnsToggleEdit()
         eMode = false
      })
      editBtn.parentNode.replaceChild(cloneBtn, editBtn)
      this.buttons.editBtn = cloneBtn
   },
}

export default elements
