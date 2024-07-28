import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const { fetch: originalFetch } = window;
 
const initialState = {
  loading: false,
  error: "",
  success: "",
  uuid: "",
  name: ""
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

  const getAccountBalance = async (accountid: any) => {
    try {
      const response = await fetch(config.API_URL + "accounts/" + accountid + '/balances', {
        method: "GET",
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const listTransactions = async (accountid: any) => {
    try {
      const response = await fetch(config.API_URL + "accounts/" + accountid + "/transactions", {
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
      const response = await fetch(config.API_URL + "login?username=" + auth.username + '&password=' + auth.password, {
        method: "GET",
      });
      const responseJson = await response.text();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const requestTravelInsurance = async (data: any) => {
    try {
      const startDate = data.startDate.replace(/\-/g,'/')
      const response = await fetch(config.API_URL + "transferToTravelInsurance?period=" + data.insurance + "&startDate=" + startDate, {
        method: "POST",
      });
      const responseJson = await response.text();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const requestTravelAccount = async (amount: any) => {
    try {
      const response = await fetch(config.API_URL + "transferToTravelAccount?amount=" + amount, {
        method: "POST",
      });
      const responseJson = await response.text();
      return responseJson;
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log("api error", err);
    }
  };

  const requestOpenAccount = async (data: any) => {
    try {
      const amount:any = parseFloat(data.amount)
      const startDate = data.startDate.replace(/\-/g,'/')
      const response = await fetch(config.API_URL + "openTravel?=amount=" + amount + "&period=" + data.insurance + "&startDate=" + startDate, {
        method: "POST",
      });
      const responseJson = await response.text();
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
        listTransactions,
        requestTravelAccount,
        requestOpenAccount,
        requestTravelInsurance,
        
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
