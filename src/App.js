import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';

import Splash from "./container/splash";
import StartMain from "./container/startMain";
import SignUp1 from './container/signUp1';
import SignUp2 from './container/signUp2';
import BodyInfo1 from './container/bodyInfo1';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Layout> */}
          <Routes>
            <Route exact path="/" element={<Splash />}></Route>
            <Route path="/start" element={<StartMain />}></Route>
            <Route path="/start/signup1" element={<SignUp1 />}></Route>
            <Route path="/start/signup2" element={<SignUp2 />}></Route>
            <Route path="/start/bodyInfo1" element={<BodyInfo1 />}></Route>
          </Routes>
      {/* </Layout> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
