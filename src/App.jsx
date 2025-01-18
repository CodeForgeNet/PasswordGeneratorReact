import { useState, useCallback } from "react"

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenrerator = useCallback( ()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+[]{}~`';:,.<>?"

    for(let i=1; i<=length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }

    setPassword(pass)

  } ,[length, numAllowed, charAllowed, setPassword])
  

  return (
    <>
      <div className="w-full max-w-mid mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 " ></div>
    </>
  )
}

export default App
