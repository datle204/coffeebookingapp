import "./UserLoginPage.css";
import { useState } from "react";
// import { checkLogin } from "../api";
import { useHistory } from "react-router-dom";


export default function UserLoginPage() {
  const history = useHistory();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isError, setIsError] = useState(false);

  async function Login() {
      history.push("/home");
  }

  return (
    <div className="container">
      <div className="login-page">
        <div className="left-side" style={{backgroundImage: "url('/coffie-banner3.jpeg')", backgroundRepeat:  'no-repeat' , opacity:0.9}}>
            <div className="background"></div>
          <div className="wrap-content">
            <img src="coffie-logo.png" alt="logo" />
            <h1 className="login-page-title">Thưởng thức những tách Cafe ngon mỗi ngày cùng Coffie</h1>
          </div>
        </div>
        <div className="right-side">
          <div className="login-form">
            <h1 className="title">Đăng Nhập</h1>
            {isError && (
              <div
                style={{
                  color: "red",
                  marginLeft: "50px",
                  paddingBottom: "20px",
                }}
              >
                Email or Password incorrect
              </div>
            )}
            <div className="input-field">
              <input
                type="email"
                name="Email"
                id="login-email"
                placeholder="Email"
                onChange={(event) => setLoginEmail(event.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="Password"
                id="login-password"
                placeholder="Mật khẩu"
                onChange={(event) => setLoginPassword(event.target.value)}
              />
            </div>
            <div className="bottom-login">
                <div className="check-field">
                <input type="checkbox" id="remember-pass" />
                <label htmlFor="remember-pass">Ghi nhớ tài khoản</label>
                </div>
                <div className="sign-up-btn">
                    <button className="sign-up"> Đăng ký </button>
                </div>
            </div>
            <button type="button" onClick={Login} className="sign-in">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
