import "./App.css";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import CONFIG from "./config";
import DataTable from "./DataTable";
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
          .split(" ")
          .map((l) => l.trim())
          .reverse()
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
        let processed_results = new Map();
        values.forEach((value) => {
          const lng_lat = value.config.url
            .split("?")[1]
            .split("&")[0]
            .slice(7)
            .split(",")
            .reverse()
            .join(",");
          if (value && value.data && value.data.results && value.data.results.length) {
            const result = value.data.results[0];
            processed_results.set(lng_lat, result.formatted_address);
          } else {
            processed_results.set(lng_lat, "-- error --");
          }
        });

        setAddresses(processed_results);
      })
      .catch((e) => {
        window.alert(e);
        setAddresses("");
      });
  };

  const handleClear = () => {
    setInputs("");
    setAddresses("");
  };

  const getTableData = () => {
    return inputs
      .trim()
      .split("\n")
      .map((input) => {
        const key = input
          .trim()
          .split(" ")
          .map((l) => l.trim())
          .join(",");

        return {
          latlng: key.split(",").join(" "),
          address: addresses.get(`${key}`),
        };
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>經緯度地址轉換器</h1>

        <section className="action__bar">
          <p>輸入經緯度時，經、緯之間需有空白相隔</p>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={handleDecode}
            disabled={!inputs.length}>
            轉換
          </Button>{" "}
          |
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleClear}>
            清除
          </Button>
        </section>

        <main className="transformer">
          <TextField
            label="輸入經緯度，多筆請換行；經在前，緯在後，中間請空格"
            type="text"
            variant="outlined"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            multiline={true}
            rows={10}
            placeholder={"121.721183 25.120552\n121.720458 25.120351\n121.720458 25.120351"}
          />

          <h3>轉換結果</h3>
          {addresses ? (
            <DataTable
              header={[
                { key: "latlng", name: "經緯度" },
                { key: "address", name: "地址" },
              ]}
              data={getTableData()}
            />
          ) : (
            <p>-- no result --</p>
          )}
        </main>
      </header>
    </div>
  );
}

export default App;
