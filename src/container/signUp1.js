import HowMuch from "../components/howMuch";
import ForWhat from "../components/forWhat";
import When from "../components/when";
import SelectGender from "../components/selectGender";
import HealthCheck from "../components/healthCheck";
import SetNickname from "../components/setNickname";

import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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

  const handleSingUp = async () => {
    try {
      //API 요청
      let data = {
        username: formdata.username,
        email: formdata.username,
        password: formdata.password,
        gender: "M",
        birth_date: "1990-01-01",
        height: formdata.height,
        weight: formdata.weight,
        disease: "None",
      };

      const response = await apiClient.post("users/", data);
      console.log(response);
      // 201이면 성공
      if (response.status === 201) {
        navigate("/start/loading");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <SetNickname handle={handleInputChange} onNext={handleSingUp} />
          )}
        </div>
      </main>
    </div>
  );
};

export default SignUp1;
