import React, { useState } from "react";
import styles from "./RandomColor.module.css";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("HEX");
  const [color, setColor] = useState("#000000");
  const [copySuccess, setCopySuccess] = useState("");

  const handleCreateRandomHexColor = () => {
    const hexChars = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexChars.length);
      hexColor += hexChars[randomIndex];
    }
    setColor(hexColor);
    setCopySuccess("");
  };

  const handleCreateRandomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r}, ${g}, ${b})`);
    setCopySuccess("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 1500);
    });
  };

  return (
    <>
      <div className={styles.controls}>
        <button
          className={styles.buttonCss}
          onClick={() => setTypeOfColor("HEX")}
          aria-pressed={typeOfColor === "HEX"}
        >
          Create HEX Color
        </button>
        <button
          className={styles.buttonCss}
          onClick={() => setTypeOfColor("RGB")}
          aria-pressed={typeOfColor === "RGB"}
        >
          Create RGB Color
        </button>
        <button
          className={styles.buttonCss}
          onClick={typeOfColor === "HEX" ? handleCreateRandomHexColor : handleCreateRandomRgbColor}
        >
          Generate Random Color
        </button>
      </div>

      <h2
        className={styles.colorCode}
        onClick={copyToClipboard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copyToClipboard() }}
        aria-label={`Current color code ${color}. Click to copy.`}
        title="Click to copy color code"
        aria-live="polite"
      >
        Current Color: <span>{color}</span>
        {copySuccess && (
          <span className={`${styles.copyMessage} ${styles.visible}`}>
            — {copySuccess}
          </span>
        )}
      </h2>

      <div
        className={styles.wrapper}
        style={{ backgroundColor: color }}
        aria-live="polite"
      >
      </div>
    </>
  );
};

export default RandomColor;
