import HowMuch from "../components/howMuch";
import ForWhat from "../components/forWhat";
import When from "../components/when";
import SelectGender from "../components/selectGender";
import HealthCheck from "../components/healthCheck";
import SetNickname from "../components/setNickname";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
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
            <SetNickname
              formdata={formdata}
              handle={handleInputChange}
              navigate={navigate}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SignUp1;
