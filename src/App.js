import "./App.css";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import CONFIG from "./config";
const axios = require("axios").default;

function App() {
  const [inputs, setInputs] = useState("");
  const [addresses, setAddresses] = useState("");

  const handleDecode = () => {
    const latlngs = inputs
      .trim()
      .split("\n")
      .map((input) =>
        input
          .trim()
          .split(",")
          .map((l) => l.trim())
          .join(",")
      );

    let promises = [];
    latlngs.forEach((latlng) => {
      const promise = axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&language=zh-TW&result_type=street_address&location_type=ROOFTOP&key=${CONFIG.API_KEY}`
      );
      promises.push(promise);
    });

    Promise.all(promises)
      .then((values) => {
        setAddresses(
          values
            .map((value) => {
              if (value && value.data && value.data.results && value.data.results.length) {
                return value.data.results[0].formatted_address;
              }
              return "-- error --";
            })
            .join("\n")
        );
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>經緯度地址轉換器</h1>

        <section className="action__bar">
          <p>輸入經緯度時，不必在乎 , 前後是否有空白，網站會自動處理</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDecode}
            disabled={!inputs.length}>
            轉換
          </Button>
        </section>

        <main className="transformer">
          <TextField
            label="輸入經緯度，多筆請換行"
            type="text"
            variant="outlined"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            multiline={true}
            rows={25}
            placeholder={"40.714224,-73.961452\n40.714224,-73.961452\n40.714224,-73.961452"}
          />
          <TextField
            label="地址轉換結果"
            type="text"
            variant="outlined"
            value={addresses}
            multiline={true}
            rows={25}
          />
        </main>
      </header>
    </div>
  );
}

export default App;
