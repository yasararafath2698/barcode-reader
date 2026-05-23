import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import "./App.css";

function App() {
  const videoRef = useRef(null);

  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    let controls;

    const startScanner = async () => {
      try {
        controls = await codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, error) => {
            if (result) {
              const scannedBarcode = result.getText();

              // Prevent duplicate scans
              if (barcode === scannedBarcode) return;

              setBarcode(scannedBarcode);

              console.log("Scanned Barcode:", scannedBarcode);

              // Beep Sound
              const audio = new Audio(
                "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
              );

              audio.play();

              // Reset after 2 sec
              setTimeout(() => {
                setBarcode("");
              }, 2000);
            }
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [barcode]);

  // Print Barcode
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=400,height=300");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>

          <style>
            body{
              font-family: Arial;
              text-align:center;
              padding-top:50px;
            }

            .barcode{
              font-size:32px;
              font-weight:bold;
            }
          </style>
        </head>

        <body>
          <h2>Scanned Barcode</h2>

          <div class="barcode">
            ${barcode}
          </div>

          <script>
            window.onload = function(){
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="container">
      <h1>Real Product Barcode Scanner</h1>

      <video ref={videoRef} className="video" />

      <div className="result-box">
        <h2>Barcode Number</h2>

        {barcode ? (
          <>
            <div className="barcode-number">
              {barcode}
            </div>

            <button onClick={handlePrint}>
              Print Barcode
            </button>
          </>
        ) : (
          <p>Scan Any Real Product</p>
        )}
      </div>
    </div>
  );
}

export default App;