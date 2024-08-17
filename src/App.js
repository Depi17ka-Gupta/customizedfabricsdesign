import React from "react";
import Fabric from "./Fabric";
import Design from "./Design";
import Cal from "./Cal";
import "../node_modules/bootstrap5/src/css/bootstrap.min.css";
import "../node_modules/bootstrap5/src/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fabric />} />
          {/* <Route path="/" element={ <Cal pixelWidth={140} pixelHeight={132} physicalWidth={1600} physicalHeight={1504} />} /> */}


          <Route path="/design" element={<Design />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
