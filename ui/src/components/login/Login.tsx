import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  loginToRaceDashboard,
  updateLoginToken,
} from "../../redux/actions/loginActions";
import { LoginParamType } from "./types/loginTypes";
import { useAppDispatch } from "../../redux/react-redux-hooks";

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.trim();
    setEmail(val);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.trim();
    setPassword(val);
  };

  const handleLogin = (e: SyntheticEvent): void => {
    e.preventDefault();
    const loginCred: LoginParamType = {
      email,
      password,
    };
    loginToRaceDashboard(loginCred).then((res) => {
      dispatch(
        updateLoginToken({
          ...loginCred,
          token: res.data.token,
        })
      );
      history.push("/race");
    });
  };

  return (
    <div className="login-wrapper">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div className="login-cred-wrapper">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email address..."
            required
          />
        </div>
        <div className="login-cred-wrapper">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password..."
            required
          />
        </div>
        <div className="btn-wrapper">
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
