// Not in use

//-----------React-----------//
// import React from "react";
import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext(null);

export default function ContextProvider({ children }) {
  const [address, setAddress] = useState("");

  const context = {
    address,
    setAddress,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
