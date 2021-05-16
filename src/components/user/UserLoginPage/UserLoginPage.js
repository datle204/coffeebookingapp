import "./UserLoginPage.css";
import { useState } from "react";
import { checkLogin, createUser } from "../../Api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import FormModal from "./CreateUser";
import { updateName, updateAvatar } from "../../../features/userSlice";

export default function UserLoginPage() {
  const history = useHistory();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();

  localStorage.removeItem("token");

  function openModal() {
    setShowModal(true);
  }

  function addUser(data) {
    let dataUpdate = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      avatar: "/" + data.avatar.replace(/^C:\\fakepath\\/, ""),
    };
    createUser(dataUpdate);
    setShowModal(false);
  }

  async function login() {
    try {
      const res = await checkLogin(loginEmail, loginPassword);
      if (res.status === 200) {
        history.push("/home");
        let username = res.data.name;
        let avatar = res.data.avatar;
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        // return username, avatar;
        dispatch(updateName(localStorage.getItem("username")));
        dispatch(updateAvatar(localStorage.getItem("avatar")));
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <div className="main">
      <div className="login-page">
        <Row>
          <Col
            md={8}
            style={{
              backgroundImage: "url('/coffie-banner3.jpeg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: 0.9,
            }}
          >
            <div className="left-side">
              <div className="wrap-content">
                <img src="coffie-logo.png" alt="logo" />
                <h1 className="login-page-title">
                  Thưởng thức những tách Cafe ngon mỗi ngày cùng Coffie
                </h1>
              </div>
            </div>
          </Col>
          <Col md={4}>
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
                    <button className="sign-up" onClick={() => openModal()}>
                      {" "}
                      Đăng ký{" "}
                    </button>
                  </div>
                </div>
                <button type="button" onClick={login} className="sign-in">
                  Đăng nhập
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <FormModal
          visible={showModal}
          closeModal={() => setShowModal(false)}
          addUser={addUser}
          name={name}
          email={email}
          password={password}
          phone={phone}
          avatar={avatar}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setPhone={setPhone}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}
