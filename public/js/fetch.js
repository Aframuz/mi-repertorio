const fetchData = async (url, method, obj = {}) => {
   // Fecth options
   const options = {
      method: method,
      headers: {
         "Content-Type": "application/json; charset=utf-8",
      },
   }

   // If method isn't GET, add body to options
   if (method !== "GET") {
      options.body = JSON.stringify(obj)
   }

   // Fetch!
   try {
      const res = await fetch(url, options)
      const json = await res.json()
      return json
   } catch (err) {
      console.error(`Error fetching data with METHOD : ${method}`)
   }
}

export default fetchData
