import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import startMain from "./container/startMain";
import signUp2 from "./container/signUp2"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<StartMain />}></Route> */}
          <Route path="/start" element={<startMain />}></Route>
          <Route path="/start/signup2" element={<signUp2 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
