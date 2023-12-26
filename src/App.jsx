import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [data, getData] = useState([]);

  async function getTextData() {
    if (text == "") {
      getData([]);
    } else {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      getData(result.data.items);
    }
  }

  useEffect(() => {
    getTextData();
  }, [text]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
      />
      <ul>
        {data.map((item) => {
          return <li key={item.id}>{item.volumeInfo.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
