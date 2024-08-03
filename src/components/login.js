import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
// import axios from "axios";
import apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      //   username: username,
      email: email,
      password: password,
    };

    try {
      //API 요청
      const response = await apiClient.post("users/token/", data);
      console.log(response);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      if (response.status === 200) {
        navigate("/start/loading");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mt-[26px] mb-[32px] flex flex-col justify-start px-[20px]">
      <div className="text-[26px] font-[AppleBold]">
        다시 돌아온 걸 환영해요 <br />
        <span className="text-[16px] text-gray font-AppleSemiBold">
          로그인하기 위한 회원정보를 입력해주세요
        </span>
      </div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[100px] ml-[119px]">
        당신의 이름은...
      </div>

      <input
        type="text"
        className="w-[267px] h-[44px] font-AppleMedium text-center ml-[34px] mt-[10px] text-[22px]"
        // onChange={(e) => setUsername(e.target.value)}
      />
      <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[34px]"></div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[80px] ml-[119px]">
        아이디(이메일)
      </div>

      <input
        type="text"
        className="w-[267px] h-[44px] font-AppleMedium text-center ml-[34px] mt-[10px] text-[22px]"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[34px]"></div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[80px] ml-[135px]">
        비밀번호
      </div>

      <input
        type="text"
        className="w-[267px] h-[44px] font-AppleMedium text-center ml-[34px] mt-[10px] text-[22px]"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[34px]"></div>

      <div className="absolute bottom-[32px] w-full flex">
        <div className=" w-full max-w-md">
          <Button
            backgroundColor="#8478F7"
            color="white"
            content={"완료"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
