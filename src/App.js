import reactLogo from "./logo.svg";
import metaLogo from "./meta.png";
import waLogo from "./whatsapp.png";
import "./App.css";
import QRProcessor from "qr.js";
import React from "react";

const WIDTH = 10;
const HEIGHT = 10;
function App() {
  const qrData = QRProcessor("https://example.com/", {
    errorCorrectLevel: QRProcessor.ErrorCorrectLevel.H,
  });

  const [cells, setCells] = React.useState(qrData.modules);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [url, setUrl] = React.useState("https://example.com/");

  const onChangeUrl = (value) => {
    setUrl(value);
    const qrData = QRProcessor(value, {
      errorCorrectLevel: QRProcessor.ErrorCorrectLevel.H,
    });
    const cells = qrData.modules;
    setCells(cells);
  };
  const uploadImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return cells && imageUrl ? (
    <div style={{ position: "relative" }}>
      {cells.map((row, j) => (
        <Row
          row={row}
          j={j}
          key={j}
          rowCount={cells.length}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  ) : (
    <>
      <div>
        <header> Hello! </header>
        <header>
          Url for the QRCode:{" "}
          <input
            type="text"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
          />
        </header>
        <header>
          Upload an image to QRify:{" "}
          <input
            style={{ display: "inline" }}
            type="file"
            id="files"
            label="upload image "
            accept="image/*"
            onChange={uploadImage}
          />
        </header>
      </div>
      <header>
        Or chose one of these logos:
        <Button onClick={() => setImageUrl(reactLogo)} label="React" />
        <Button onClick={() => setImageUrl(metaLogo)} label="Meta" />
        <Button onClick={() => setImageUrl(waLogo)} label="Whatsapp" />
      </header>
    </>
  );
}

function Cell({ value, i, j, rowCount, colCount, imageUrl }) {
  const x = i * WIDTH;
  const y = j * HEIGHT;
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
          width: WIDTH * colCount,
          height: HEIGHT * rowCount,
          clipPath: `xywh(${y}px ${x}px ${WIDTH}px ${HEIGHT}px)`,
          opacity: value ? 0.75 : 0.25,
        }}
        src={imageUrl}
      />
    </>
  );
}

function Row({ row, j, rowCount, imageUrl }) {
  return row.map((cell, i) => (
    <Cell
      value={cell}
      i={i}
      j={j}
      rowCount={rowCount}
      colCount={row.length}
      key={i}
      imageUrl={imageUrl}
    />
  ));
}

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ display: "inline", margin: 4 }}>
      {label}
    </button>
  );
}

export default App;
