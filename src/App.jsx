import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // use ref
  const passwordRef = useRef(null)

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
  

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(passwordRef.current.value)
    passwordRef.current?.select()
  },[passwordRef])


  useEffect(()=>{
    passwordGenrerator()
  },[length.numAllowed, charAllowed, passwordGenrerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 " >
        <h1 className="text-white text-center my-3" >Text Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4" >
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          />
          <button className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0 " onClick={copyPasswordToClipboard} >Copy</button>
        </div>
        <div className="flex text-sm gap-x-3" >
          <div className="flex items-center gap-x-1" >
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={e => setLength(e.target.value)}
            />
            <label>Label : {length} </label>
          </div>
          <div className="flex items-center gap-x-1" >
            <input 
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={()=>{
              setNumAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor="numberInput" >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1" >
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor="characterInput" >Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
