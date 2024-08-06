import React, { useState } from "react";
import Button from "./Button";
import apiClient from "../apiClient";

const SetNickname = ({ formdata, handle, navigate }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let gender = formdata.gender;
    if (gender === "남성") gender = "M";
    else if (gender === "여성") gender = "F";
    else gender = "E";

    const birth_date = `${formdata.year}-${formdata.month.padStart(
      2,
      "0"
    )}-${formdata.day.padStart(2, "0")}`;

    try {
      const data = {
        username: formdata.username,
        email: formdata.email,
        password: formdata.password,
        gender: gender,
        birth_date: birth_date,
        height: formdata.height,
        weight: formdata.weight,
        disease: "None",
      };

      const response = await apiClient.post("users/", data);
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        navigate("/start/loading");
      }
    } catch (error) {
      console.error(error);
      const error_data = error.response.data;
      if (error_data.username) {
        setErrorMessage("이미 사용중인 이름입니다.");
      } else if (error_data.email) {
        setErrorMessage("이미 사용중인 이메일입니다.");
      } else {
        setErrorMessage("입력 정보를 다시 확인해주세요.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[3.38vh] mb-[4.19vh] flex flex-col justify-start px-[5.33vw]"
    >
      <div className="text-[26px] font-[AppleBold]">
        거의 다왔어요. <br />
        뭐라고 부르면 될까요?
      </div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[3.38vh] ml-[31.73vw]">
        당신의 이름...
      </div>

      <input
        type="text"
        className="w-[71.2vw] h-[5.88vh] font-AppleMedium text-center ml-[9.07vw] mt-[3.85vh] text-[22px]"
        onChange={(e) => handle("username", e.target.value)}
        value={formdata.username}
        required
      />
      <div className="w-[71.2vw] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[9.07vw]"></div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[6.7vh] ml-[31.73vw]">
        당신의 이메일...
      </div>

      <input
        type="email"
        className="w-[71.2vw] h-[5.88vh] font-AppleMedium text-center ml-[9.07vw] mt-[3.85vh] text-[22px]"
        onChange={(e) => handle("email", e.target.value)}
        value={formdata.email}
        required
      />
      <div className="w-[71.2vw] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[9.07vw]"></div>

      <div className="text-[16px] text-[#5A5A5A] font-[AppleMedium] mt-[6.7vh] ml-[31.73vw]">
        당신의 비밀번호...
      </div>
      <input
        type="password"
        className="w-[71.2vw] h-[5.88vh] font-AppleMedium text-center ml-[9.07vw] mt-[3.85vh] text-[22px]"
        onChange={(e) => handle("password", e.target.value)}
        value={formdata.password}
        required
      />

      <div className="w-[71.2vw] my-[1%] border-[1px] border-[#999999] mb-[0%] mt-[0%] ml-[9.07vw]"></div>

      {errorMessage && (
        <div className="text-center text-exgray font-AppleMedium text-[16px] mt-[4.05vh]">
          {errorMessage}
        </div>
      )}

      <div className="absolute bottom-[4.19vh] w-full flex">
        <Button
          backgroundColor={"#8478F7"}
          color={"white"}
          content={"완료"}
          type="submit"
        />
      </div>
    </form>
  );
};

export default SetNickname;

