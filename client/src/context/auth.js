import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  //default axios header property
  // axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.headers.common["Authorization"] = auth.token || "";
  useEffect(() => {
    const data = localStorage.getItem("auth");
    console.log(data);
    if (data) {
      const parseData = JSON.parse(data);
      console.log(parseData.user, "parseUser");
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
