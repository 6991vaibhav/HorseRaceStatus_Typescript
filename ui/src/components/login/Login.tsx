import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  loginToRaceDashboard,
  updateLoginToken,
} from "../../redux/actions/loginActions";
import { LoginParamType } from "./types/loginTypes";
import { useAppDispatch } from "../../redux/react-redux-hooks";
import { validateEmail } from "../../helpers/utils";
import { ERR_LOGIN, INVALID_EMAIL } from "../../helpers/constants";
import Toast from "../common/toast/Toast";

const Login = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
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

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    if (isValidEmail) {
      setError(false);
      const loginCred: LoginParamType = {
        email,
        password,
      };
      const loginRes = await loginToRaceDashboard(loginCred);
      if (loginRes && !loginRes.data.error) {
        dispatch(
          updateLoginToken({
            ...loginCred,
            token: loginRes.data.token,
          })
        );
        history.push("/race");
      } else {
        setShowToast(true);
      }
    } else {
      setError(true);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  }

  return (
    <>
      {showToast && <Toast message={ERR_LOGIN} type="error" handleCloseToast={handleCloseToast} />}
      <div className="login-wrapper">
        <h3>Login</h3>
        {error && <div className="error">{INVALID_EMAIL}</div>}
        <form onSubmit={handleLogin}>
          <div className="login-cred-wrapper">
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email address..."
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
    </>
  );
};

export default Login;
