import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Splash from "./container/splash";
import StartMain from "./container/startMain";
import SignUp2 from './container/signUp2';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Splash />}></Route>
          <Route path="/start" element={<StartMain />}></Route>
          <Route path="/start/signup2" element={<SignUp2 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
