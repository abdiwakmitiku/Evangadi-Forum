import React,{ createContext,useReducer } from "react";

const [state, dispatch] = useReducer(reducer, initialState)

useEffect(() => {
  // Check for existing token on app load
  const token = localStorage.getItem("token");
  if (token) {
    axios.get("/user/check", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      dispatch({ type: Type.SET_USER, user: res.data.user });
    })
    .catch(err => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
    });
  }
}, []);

// Create context
export const DataContext = createContext();

export const DataProvider = ({children,reducer,initialState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer,initialState)}>
           {children}
        </DataContext.Provider>
    )
}
