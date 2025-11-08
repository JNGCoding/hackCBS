import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { sendPlainText } from '../services/BackendBridge';

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  height: number;
  weight: number;
  allergies: string;
  emergencyContact: string;
};

type GlobalState = {
  username: string;
  setUsername: (name: string) => void;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

const defaultFormData: FormDataType = {
  name: '',
  email: '',
  phone: '',
  location: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  height: 0,
  weight: 0,
  allergies: '',
  emergencyContact: ''
};

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("Guest");
  const [formData, setFormData] = useState<FormDataType>(defaultFormData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendPlainText("account/info", username);
      const jsonPart = JSON.parse(response);

      setFormData({
        name: jsonPart["username"],
        email: username,
        phone: jsonPart["phone"],
        location: jsonPart["location"],
        dateOfBirth: jsonPart["birthdate"],
        gender: jsonPart["gender"],
        bloodGroup: jsonPart["bloodgroup"],
        height: jsonPart["height_in_cm"],
        weight: jsonPart["weight"],
        allergies: jsonPart["allergies"],
        emergencyContact: jsonPart["phone"]
      });
    };

    fetchData();
  }, [username]);  

  return (
    <GlobalContext.Provider value={{ username, setUsername, formData, setFormData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within GlobalProvider");
  return context;
};