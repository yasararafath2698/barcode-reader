import React, { useEffect, useState } from "react";
import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import "./App.css";

function App() {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.UPC_A,
        ],
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.log(err));
    };
  }, []);

  return (
    <div className="container">
      <h1>Product QR / Barcode Scanner</h1>

      <div id="reader"></div>

      <div className="result-box">
        <h2>Scanned Product Code</h2>

        {scanResult ? (
          <p className="success">{scanResult}</p>
        ) : (
          <p className="waiting">Waiting for scan...</p>
        )}
      </div>
    </div>
  );
}

export default App;