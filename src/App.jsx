import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [numbers, setnumber] = useState(false);
  const [chars, setchars] = useState(false);

  //useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (chars) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let c = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(c);
    }
    setpassword(pass);
  }, [length, numbers, chars, setpassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, chars, passwordGenerator]);

  return (
    <div id="a">
      <div className="one">
        <h1>Password Generator</h1>
        <div>
          <input
            style={{
              height: "29px",
              width: "280px",
              borderRadius: "10px",
              fontWeight: "bolder",
              lineHeight: "29px",
            }}
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            style={{
              height: "34px",
              width: "90px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontFamily: "arial",
              marginLeft: "2px",
            }}
          >
            Copy
          </button>
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: "20px",
            marginRight: "20px",
          }}
        >
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setlength(parseInt(e.target.value));
            }}
          />
          <label>Length:{length}</label>

          <div style={{ display: "inline-block" }}>
            <input
              type="checkbox"
              defaultChecked={numbers}
              id="numberinput"
              onChange={() => {
                setnumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>
          <div style={{ display: "inline-block" }}>
            <input
              type="checkbox"
              defaultChecked={chars}
              id="characterinput"
              onChange={() => {
                setchars((prev) => !prev);
              }}
            />
            <label htmlFor="characterinput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
