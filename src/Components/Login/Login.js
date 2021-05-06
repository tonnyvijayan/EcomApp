import { useAuth } from "../../Contexts/AuthContext/AuthProvider";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";

const savedUserCredentials = {
  username: "test1",
  password: "dummy",
};

export const Login = () => {
  const { toastCreator } = useCart();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const loginChangeHandler = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const { state } = useLocation();
  const navigate = useNavigate();
  const { login, setlogin } = useAuth();

  const credentialsValidator = (username, password) => {
    if (
      username === savedUserCredentials.username &&
      password === savedUserCredentials.password
    ) {
      setlogin(true);
      navigate(state?.from);
      localStorage.setItem("islogin", JSON.stringify({ login: true }));
      toastCreator("Logged In", true);
    } else {
      console.log("Authentication failed");
    }
  };

  const loginButtonHandler = () => {
    credentialsValidator(userCredentials.username, userCredentials.password);
  };
  const logoutButtonHandler = () => {
    setlogin(false);
    localStorage.removeItem("islogin");
    navigate("/");
  };
  return (
    <div class="login-form">
      <div class="container">
        <div class="content">
          <h2>log In</h2>
          <div class="form-div">
            <input
              type="text"
              placeholder="User Name"
              name="username"
              onChange={loginChangeHandler}
            />
            <input
              type="password"
              placeholder="User Password"
              name="password"
              onChange={loginChangeHandler}
            />
            {/* <button class="btn" type="submit">
            Log In
          </button> */}

            {login ? (
              <button onClick={logoutButtonHandler} class="btn">
                Logout
              </button>
            ) : (
              <button class="btn" onClick={loginButtonHandler}>
                Login
              </button>
            )}
          </div>
          {/* <p class="account">
            Dont have an account?<Link to="/signup">Register</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};
