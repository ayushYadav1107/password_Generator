import {
    useState,
    useCallback,
    useEffect,
    useRef
} from "react";
import './App.css'

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState('');

    //useRef hook
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmlnopqrstuvwxyz"
        if (numberAllowed) str += "0123456789"
        if (characterAllowed) str += "!@#$%^&*()_+-=[]{}|;:'\",.<>?/"

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);

    }, [length, numberAllowed, characterAllowed, setPassword]); //with useCallback we are optimizing the deps
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
    }, [password]);
    useEffect(() => { // with useEffect we are running the function again and again if we encounter changes
        passwordGenerator()
    }, [length, characterAllowed, numberAllowed, passwordGenerator]);
    return <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password
            generator</h1>
        <div
            className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="Password"
                readOnly
                ref={passwordRef}
            />
            <button
                onClick={copyPasswordToClipboard}
                className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-orange-400'
            >copy
            </button>
        </div>
        <div
            className="flex text-sm gap-x-2">
            <div
                className="flex items-center gap-x-1">
                <input
                    type="range"
                    min={8}
                    max={100}
                    value={length}
                    className="cursor-pointer"
                    onChange={(e) => {
                        setLength(e.target.value)
                    }}
                />
                <labe> Length: {length}</labe>
            </div>
            <div
                className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={numberAllowed}
                    id="numberInput"
                    onChange={() => {
                        setNumberAllowed(prevValue => !prevValue);
                    }}/>
                <label>Numbers</label>
            </div>
            <div
                className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={characterAllowed}
                    id="characterInput"
                    onChange={() => {
                        setCharacterAllowed((prev) => !prev)
                    }}
                />
                <label
                    htmlFor="characterInput">Characters</label>
            </div>
        </div>
    </div>
}

export default App
