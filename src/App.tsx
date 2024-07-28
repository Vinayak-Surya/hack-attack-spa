import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {Context as context} from "./shared/context"
import Footer from "./components/footer";
import { Login } from "./components/login/login";
import { NavBar } from "./components/navBar";
import NotFound from "./components/not-found";
import Home from "./components/home/home";
import Transactions from "./components/transactions/transactions";
import Accounts from "./components/accounts/accounts";
import Fundstransfer from "./components/fundstransfer/fundstransfer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
  const auth = context();
  const [isLogin, loggedIn] = useState(0);
  const uuid = auth.state.uuid && sessionStorage.getItem(auth.state.uuid)

  useEffect(() => {
    if (!isLogin) {
      sessionStorage.clear();
    }
  }, [isLogin]);

  const PrivateRoute = ({ children }: any) => {
    return isLogin && uuid ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  };

  const onVerifyLogin = () => {
    loggedIn(1);
  };

  return (
    <div>
        {isLogin && uuid ? <NavBar /> : ""}
        <Routes>
          <Route path="/" element={<Login checkLogIn={onVerifyLogin} />}></Route>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route
            path="/travel-accounts"
            element={
              <PrivateRoute>
                <Fundstransfer />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <PrivateRoute>
                <Accounts />
              </PrivateRoute>
            }
          />
          <Route
            path="/404"
            element={
              <PrivateRoute>
                <NotFound />
              </PrivateRoute>
            }>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
