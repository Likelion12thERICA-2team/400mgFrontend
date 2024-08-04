import HowMuch from "../components/howMuch";
import ForWhat from "../components/forWhat";
import When from "../components/when";
import SelectGender from "../components/selectGender";
import HealthCheck from "../components/healthCheck";
import SetNickname from "../components/setNickname";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../apiClient";

const SignUp1 = () => {
  const [step, setStep] = useState(1);
  const [formdata, setFormdata] = useState({
    howOften: "",
    howMany: "",
    forWhat: [],
    when: [],
    gender: "",
    year: "",
    month: "",
    day: "",
    height: "",
    weight: "",
    username: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  // 테스트 for formdata
  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const navigate = useNavigate();

  const handleSignUp = async () => {
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
        email: formdata.username,
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
    }
  };

  useEffect(() => {
    handleSignUp();
  }, [formdata.password]);

  return (
    <div className="">
      <main className="">
        <div className="">
          {step === 1 && (
            <HowMuch handle={handleInputChange} onNext={nextStep} />
          )}
          {step === 2 && (
            <ForWhat handle={handleInputChange} onNext={nextStep} />
          )}
          {step === 3 && <When handle={handleInputChange} onNext={nextStep} />}
          {step === 4 && (
            <SelectGender handle={handleInputChange} onNext={nextStep} />
          )}
          {step === 5 && (
            <HealthCheck handle={handleInputChange} onNext={nextStep} />
          )}
          {step === 6 && (
            <SetNickname handle={handleInputChange} onNext={handleSignUp} />
          )}
        </div>
      </main>
    </div>
  );
};

export default SignUp1;
