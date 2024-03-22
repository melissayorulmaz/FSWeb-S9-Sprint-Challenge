import React, { useState } from "react";

const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [bIndex, setBIndex] = useState(initialIndex);

  function getXY() {
    return [(currentIndex % 3) + 1, Math.floor(currentIndex / 3) + 1];
  }

  function getXYMesaj() {
    const [x, y] = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    setMessage("");
    setEmail("");
    setSteps(0);
    setCurrentIndex(initialIndex);
    setBIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    let nextIndex;
    switch (yon) {
      case "sol":
        nextIndex =
          currentIndex === 0 || currentIndex === 3 || currentIndex === 6
            ? currentIndex
            : currentIndex - 1;
        break;
      case "sağ":
        nextIndex =
          currentIndex === 2 || currentIndex === 5 || currentIndex === 8
            ? currentIndex
            : currentIndex + 1;
        break;
      case "yukarı":
        nextIndex = currentIndex < 3 ? currentIndex : currentIndex - 3;
        break;
      case "aşağı":
        nextIndex = currentIndex > 5 ? currentIndex : currentIndex + 3;
        break;
      default:
        nextIndex = currentIndex;
    }
    return nextIndex;
  }

  function ilerle(yon) {
    const nextIndex = sonrakiIndex(yon);
    setSteps(steps + 1);
    setCurrentIndex(nextIndex);
    if (nextIndex !== currentIndex) {
      setBIndex(nextIndex);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    if (!isValidEmail(email)) {
      setMessage("Geçersiz e-posta adresi");
      return;
    }
    fetch("http://localhost:9000/api/result", {
      method: "POST",
      body: JSON.stringify({ x: getXY()[0], y: getXY()[1], steps, email }), // Email adresini de ekledik
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Sunucu hatası"));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === currentIndex ? " active" : ""}`}
          >
            {idx === bIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => ilerle("sol")}>
          SOL
        </button>
        <button id="up" onClick={() => ilerle("yukarı")}>
          YUKARI
        </button>
        <button id="right" onClick={() => ilerle("sağ")}>
          SAĞ
        </button>
        <button id="down" onClick={() => ilerle("aşağı")}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
