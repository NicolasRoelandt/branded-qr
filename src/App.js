// import logo from "./meta-logo-facebook-2.svg";
// import logo from "./logo.svg";
import logo from "./reddit-logo.jpg";
// import logo from "./logo.svg";
import "./App.css";
import QRProcessor from "qr.js";
import React from "react";

const WIDTH = 10;
const HEIGHT = 10;
function App() {
  const qrData = QRProcessor(
    "https://stackoverflow.com/questions/12991351/how-to-force-image-resize-and-keep-aspect-ratio",
    {
      errorCorrectLevel: QRProcessor.ErrorCorrectLevel.H,
    }
  );
  const cells = qrData.modules;
  const cellsPerSide = cells.length;

  return (
    <div>
      <header>
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative" }}>
            {cells.map((row, j) => (
              <Row row={row} j={j} key={j} rowCount={cells.length} />
            ))}
          </div>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Cell({ value, i, j, rowCount, colCount }) {
  const x = i * WIDTH + 50;
  const y = j * HEIGHT + 50;
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: x,
          left: y,
          width: WIDTH,
          height: HEIGHT,
          backgroundColor: value ? "black" : "#fff",
        }}
      />

      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: WIDTH * colCount + 100,
          height: HEIGHT * rowCount + 100,
          clipPath: `xywh(${y}px ${x}px ${WIDTH}px ${HEIGHT}px)`,
          opacity: value ? 0.7 : 0.3,
        }}
        src={logo}
      />
    </>
  );
}

function Row({ row, j, rowCount }) {
  return row.map((cell, i) => (
    <Cell
      value={cell}
      i={i}
      j={j}
      rowCount={rowCount}
      colCount={row.length}
      key={i}
    />
  ));
}

export default App;
