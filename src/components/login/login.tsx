import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Context as context} from "../../shared/context"
import {createSessionID} from "../../shared/config"
//import {encrypt} from "../../shared/config"
import "./login.scss";

export function Login({checkLogIn} :any) {
  const auth = context();
  const username = useRef<any>('');
  const password = useRef<any>('');
  let navigate = useNavigate();
  const [login, setLogin] = useState({username: "", password: "", "usernameerror": "", "passworderror": "", error: "", loading: false});
  const uuid = auth.state.uuid && sessionStorage.getItem(auth.state.uuid)
  
  useEffect(() => {
    if(uuid) {
      navigate('/home');
    }
  }, [uuid])

  const onLogin = (event: any) => {
    event.preventDefault();
    if (!login.username) {
      setLogin(prevState => ({
        ...prevState,
        'usernameerror': 'Please fill Username',
      }));
      username.current.focus();
      return;
    }
    if (!login.password) {
      setLogin(prevState => ({
        ...prevState,
        'passworderror': 'Please fill Password',
      }));
      password.current.focus();
      return;
    }

    setLogin(prevState => ({
      ...prevState,
      'loading': true,
      'usernameerror': '',
      'passworderror': '',
      'error': ''
    }));
    auth.saveToken(login).then((data:any) => {
      if (data === "Successful") {
        setLogin(prevState => ({
          ...prevState,
          'loading': false,
          'usernameerror': '',
          'passworderror': '',
          'error': ''
        }));
        const uuid = createSessionID(25);
        auth.setState((prevState :any) => ({
          ...prevState,
          uuid: uuid,
          name: login.username
        }));
        sessionStorage.setItem(uuid, "true")
        checkLogIn()
        navigate('/home', { replace: true });
      } else {
        setLogin(prevState => ({
          ...prevState,
          'loading': false,
          error: 'Invalid username or password',
        }));
      }
    });
  }

  const handleInput = (name:any) => (e:any) => {
    setLogin(prevState => ({
      ...prevState,
      [name]: e.target.value,
      [`${name}error`]: '',
      'error': ''
    }));
  };

  return (
    <>
      {login.error && (<div className="alert-box-center">
        <div className="alert alert-danger" role="alert">{login.error}</div>
      </div>)}
      {auth.state.error && (<div className="alert-box-center">
        <div className="alert alert-danger" role="alert">{auth.state.error}</div>
      </div>)}
      <div className="log-form">
        <h1>Login</h1>
        <form onSubmit={onLogin} noValidate>
          <div className="form-floating">
            <input type="text" ref={username} id="floatingUsername" autoFocus className="form-control" required onChange={handleInput("username")} placeholder="Username" />
            <label htmlFor="floatingUsername">Username</label>
            {login.usernameerror && <div className="text-danger mt-2">{login.usernameerror}</div>}
          </div>
          <div className="form-floating">
            <input type="password" id="floatingPassword" ref={password} title="username" className="form-control" required onChange={handleInput("password")} placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            {login.passworderror && <div className="text-danger mt-2">{login.passworderror}</div>}
          </div>
          <button type="submit" className={login.loading ? "btn disabled": "btn btn-primary"}>
            {login.loading ? <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Loading...</span>
            </>: <>Login</>}
          </button>
        </form>
      </div>
    </>
  );
}
