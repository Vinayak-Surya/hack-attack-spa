import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const { fetch: originalFetch } = window;
 
const initialState = {
  loading: false,
  token: "",
  error: "",
  success: "",
  secure: "",
  pwd: "",
  clientId: "",
  uuid: ""
};

const config = {
  API_URL: "https://hack-attack.onrender.com/",
};

const MyContext = createContext<any>(initialState);

export const Provider = ({ children }: any) => {
  const [state, setState] = useState<any>(initialState);
  const navigate = useNavigate();

  window.fetch =  async (...args:any) => {
    let [resource, config] = args;
    //setting the api token for the header
    config.headers = headers || {};
    // config.headers["x-api-key"] = apiKey;
    try {
        const response = await originalFetch(resource, config);
        if (!response.ok) {
          navigate('/404', {
            state: {
              error: 'Service indicates that the requested resource is not found. Please try again later.'
            }
          });
        }
        return response;
    } catch (error) {
        navigate('/404', {
          state: {
            error: 'Service indicates that the requested resource is not found. Please try again later.'
          }
        });
        throw error;
    }
  };

  const getAccounts = async () => {
    try {
      const response = await fetch(config.API_URL + "accounts", {
        method: "GET",
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const getAccountBalance = async () => {
    try {
      const response = await fetch(config.API_URL + "accounts", {
        method: "GET",
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const saveToken = async (auth: any) => {
    try {
      const response = await fetch(config.API_URL + "auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: auth.username,
          password: auth.password,
        }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  return (
    <MyContext.Provider
      value={{
        state,
        setState,
        getAccounts,
        saveToken,
        getAccountBalance,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

/**
 *  Context initialisation
 */
export function Context() {
  const context = useContext(MyContext);
  // if (!context) {
  //   throw new Error('useAuth must be used within an AuthProvider');
  // }
  return context;
}
