import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  // const games = data[0].game;
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:2023");
      const responseData = response.data;
      setData(responseData);
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <h1>Score kepper</h1>
      <div className="create-game">
        <div className="input">
          <input type="text" placeholder="Enter Player" />
        </div>
        <div className="input">
          <input type="text" placeholder="Enter Player" />
        </div>
        <div className="input">
          <input type="text" placeholder="Enter Player" />
        </div>
        <div className="input">
          <input type="text" placeholder="Enter Player" />
        </div>
        <button>Create game</button>
      </div>
      <div className="table">
        <table>
          <tr>
            <th>#</th>
            <th>Tai</th>
            <th>Tu</th>
            <th>Thang</th>
            <th>Hung</th>
          </tr>
          <tr className="second">
            <td>Sum of scores(20)</td>
            <td>8</td>
            <td>8</td>
            <td>8</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Round 1</td>
            <td>
              <input type="number" />
            </td>
            <td>
              <input type="number" />
            </td>
            <td>
              <input type="number" />
            </td>
            <td>
              <input type="number" />
            </td>
          </tr>
        </table>
        <button>Add round</button>
      </div>
    </div>
  );
}

export default App;
