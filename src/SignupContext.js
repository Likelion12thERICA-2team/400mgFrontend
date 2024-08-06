import { createContext, useState } from "react";

export const SignupContext = createContext();

export const SignUpProvider = ({ children }) => {
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

  return (
    <SignupContext.Provider value={[formdata, setFormdata]}>
      {children}
    </SignupContext.Provider>
  );
};
