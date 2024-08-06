import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

import Splash from "./container/splash";
import StartMain from "./container/startMain";
import SignUp1 from "./container/signUp1";
import SignUp2 from "./container/signUp2";
import BodyInfo1 from "./container/bodyInfo1";
import BodyInfo2 from "./container/bodyInfo2";
import BodyInfo3 from "./container/bodyInfo3";
import Loading from "./container/loading";
import SignUp3 from "./container/signUp3";
import Main from "./container/main";
import Report from "./container/report";
import Mypages from "./container/myPage";
import Login from "./components/login";
import Community from "./container/community";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
        <Routes>
          <Route exact path="/" element={<Splash />}></Route>
          <Route path="/start" element={<StartMain />}></Route>
          <Route path="/start/login" element={<Login />}></Route>
          <Route path="/start/signup1" element={<SignUp1 />}></Route>
          {/* <Route path="/start/signup2" element={<SignUp2 />}></Route>
          <Route path="/start/signup3" element={<SignUp3 />}></Route>
          <Route path="/start/bodyInfo1" element={<BodyInfo1 />}></Route>
          <Route path="/start/bodyInfo2" element={<BodyInfo2 />}></Route>
          <Route path="/start/bodyInfo3" element={<BodyInfo3 />}></Route> */}
          <Route path="/start/loading" element={<Loading />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/mypage" element={<Mypages />}></Route>
        </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
