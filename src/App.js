import "./App.css";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import CONFIG from "./config";
import DataTable from "./DataTable";
const axios = require("axios").default;

function App() {
  const [inputs, setInputs] = useState("");
  const [tableData, setTableData] = useState(null);

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

        const display_data = inputs
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
              address: processed_results.get(`${key}`),
            };
          });

        setTableData(display_data);
      })
      .catch((e) => {
        window.alert(e);
        setTableData(null);
      });
  };

  const handleClear = () => {
    setInputs("");
    setTableData(null);
  };

  const getDownloadLinkProps = () => {
    if (tableData) {
      const data = { data: tableData };
      const download = `ADDRESSES_${new Date().toLocaleString()}.json`;
      const downloadData = JSON.stringify(data || {}, 0, 2);
      const href = "data:application/json;charset=utf-8," + encodeURIComponent(downloadData);

      return {
        href,
        download,
      };
    }

    return {
      href: "",
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>經緯度地址轉換器</h1>

        <section className="action__bar">
          <p>輸入經緯度時，經在前，緯在後，中間請空格</p>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={handleDecode}
            disabled={!inputs}>
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
            label="輸入經緯度，多筆請換行"
            type="text"
            variant="outlined"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            multiline={true}
            rows={10}
            placeholder="121.721183 25.120552&#13;&#10;121.720458 25.120351&#13;&#10;121.720458 25.120351"
          />

          <h3>
            轉換結果
            <a {...getDownloadLinkProps()} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "20px" }}
                disabled={!tableData}>
                下載
              </Button>
            </a>
          </h3>
          {tableData ? (
            <DataTable
              header={[
                { key: "latlng", name: "經緯度" },
                { key: "address", name: "地址" },
              ]}
              data={tableData}
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
