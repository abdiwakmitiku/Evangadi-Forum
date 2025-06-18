// import React,{ createContext,useReducer } from "react";

// export const Context = createContext()

// export const ContextProvider = ({children,Reducer,InitialState})=>{
//     return(
//         <Context.Provider value={useReducer(Reducer,InitialState)}>
//            {children}
//         </Context.Provider>
//     )
// }

import React, { createContext, useReducer } from "react";

// Create context
export const Context = createContext();

// Provider
export const ContextProvider = ({ children, Reducer, InitialState }) => {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};
