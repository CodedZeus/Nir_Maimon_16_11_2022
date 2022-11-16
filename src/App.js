import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Favorites from "./Components/Favorites";
import { useEffect, useState } from "react";
import { weatherService } from "./services/weatherService";

function App() {
  const [text, setText] = useState("Tel Aviv");
  const [locations, setLocations] = useState([]);

  async function get(name) {
    const autocompleteLocations = await weatherService.getAutocomplete(name);
    setLocations(autocompleteLocations);
  }
  useEffect(() => {
    if (text.length > 2) {
      get(text);
    }
  }, [text]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                text={text}
                setText={setText}
                get={get}
                locations={locations}
                setLocations={setLocations}
              />
            }
          />
          <Route path="/favorites" element={<Favorites get={get} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
