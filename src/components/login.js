import React, { useState } from "react";
import Button from "./Button";
import apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await apiClient.post("users/token/", data);
      console.log(response);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      if (response.status === 200) {
        navigate("/start/loading");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("이메일 혹은 비밀번호를 다시 확인해주세요.");
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
      <div className="flex flex-col items-center">
        <div className="text-center text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[80px]">
          이메일
        </div>

        <input
          type="text"
          className="w-[267px] h-[44px] font-AppleMedium text-center mt-[10px] text-[22px]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%]"></div>
        <div className="text-center text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[80px]">
          비밀번호
        </div>

        <input
          type="password"
          className="w-[267px] h-[44px] font-AppleMedium text-center mt-[10px] text-[22px]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="w-[267px] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%]"></div>
      </div>

      {errorMessage && (
        <div className="text-center text-[#ff0000] font-AppleMedium text-[16px] mt-[30px]">
          {errorMessage}
        </div>
      )}

      <div className="absolute items-center bottom-[32px] w-full flex">
        <div className="w-full max-w-md">
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
