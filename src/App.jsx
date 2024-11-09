import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // function for password Generator & callback hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*_+={}[]~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, charAllowed, setPassword])

  // useEffect hook for renders the function
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, setPassword]);

  // useRef hook for password  input refrence
  const passRef = useRef(null)

  // function for copy password on clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center md:m-0 m-6">
        <div className='w-full max-w-md mx-auto'>
          <h1 className='text-3xl text-center font-bold text-blue-600 mt-10 mb-4 w-full'>Password Generator &hearts;</h1>
        </div>
        <div className="bg-slate-800 w-full max-w-md mx-auto p-8 rounded-lg shadow-md text-blue-500">
          <div className="mb-5 overflow-hidden  rounded-lg flex flex-col gap-2">
            <input type="text" className='w-full outline-none py-1 px-3' value={password} placeholder='password' readOnly ref={passRef} />
            <button className='bg-blue-700 outline-none text-white font-semibold px-3 py-1 shrink-0 hover:bg-blue-800'
              onClick={copyPasswordToClipboard}>Copy Password</button>
          </div>
          <div className="flex text-sm items-center gap-x-2 mb-4">
            <input className='cursor-pointer' type="range" min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label className="font-semibold">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input className='cursor-pointer' type="checkbox" defaultChecked={numAllowed} id='numberInput' onChange={() => {
              setNumAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput" className="font-semibold">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input className='cursor-pointer' type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={() => {
              setCharAllowed((prev) => !prev);
            }} />
            <label htmlFor="characterInput" className="font-semibold">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
