import { createContext, useState, useEffect } from "react";
import jwt_Decode from "jwt-decode";
import { useHistory } from "react-router";
import axios from "axios"

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setAuth] = useState(() =>
    localStorage.getItem("authToken")? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  let [authRefresh, setRefresh] = useState(() =>
    localStorage.getItem("authRefresh")? JSON.parse(localStorage.getItem("authRefresh"))
      : null
  );
  
    let [user, setUser] = useState(() =>
    localStorage.getItem("authToken") ? jwt_Decode(localStorage.getItem("authToken"))
      : null
  );
  const [loading,setLoading] =useState(true)

  let history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("fromSubmit");
    let response = await fetch(
      "http://dhirajssh.pythonanywhere.com/api/token/",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      setAuth(data);
      setUser(jwt_Decode(data.access));
      setRefresh(data.refresh);
      localStorage.setItem("authToken", JSON.stringify(data.access));
      localStorage.setItem("authRefresh", JSON.stringify(data.refresh));
      history.push("/");
    } else {
      alert("something wrong");
    }
  };
  

  const logout = () => {
    setAuth(null);
    setUser(null);
   // setRefresh(null)
    localStorage.removeItem("authToken");
    //localStorage.removeItem("authRefresh")
    history.push("/login");
  };
  

  
  const updateToken = async () => {
    let response = await fetch(
      "http://dhirajssh.pythonanywhere.com/api/token/refresh/",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
       body:JSON.stringify({
        "refresh": authRefresh
       })
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      setAuth(data);
      setUser(jwt_Decode(data.access));
      console.log(data)
      localStorage.setItem("authToken", JSON.stringify(data.access));
    }
    else{
      logout()
    }

    if(loading){
      setLoading(false)
    }
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logout: logout,
    authToken:authToken,
    authRefresh: authRefresh,
  };

  useEffect(()=>{

  if(loading){
    updateToken()
  }
  let twominutes = 1000*60*0.5

  let interval = setInterval(()=>{
    if(authToken){
      updateToken()
      
    }
  },twominutes)
  return()=> clearInterval(interval)


}, [authToken, loading])

  return (
    <AuthContext.Provider value={contextData}>
    {loading? null : children}
    </AuthContext.Provider>
  );
};

