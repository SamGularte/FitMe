import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

//router
import { NavLink, useNavigate } from "react-router-dom";

//axios
import axios from "axios";

//css
import styles from "./Login.module.css";

//context
import { useBoolContext } from "../../context/BoolContext";

type Props = {};

const Login = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const apiUrl = "https://parseapi.back4app.com";

  const navigate = useNavigate();

  const { booleanValue, setBooleanValue } = useBoolContext();

  setBooleanValue(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, null, {
        headers: {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
          "X-Parse-Revocable-Session": "1",
        },
        params: {
          username,
          password,
        },
      });

      if (response.status === 200) {
        console.log("API Response:", response.data);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
      }
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Uname") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className={styles.regContainer}>
      <h1 className={styles.regTitle}>Login</h1>
      <hr className={styles.regHorizontalLine} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_group}>
          <label htmlFor="Uname">Username</label>
          <input
            type="text"
            name="Uname"
            onChange={handleChange}
            value={username}
            className={styles.input_field}
          ></input>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            className={styles.input_field}
          ></input>
        </div>
        <button className={styles.btn} onClick={handleSubmit}>
          Login
        </button>
        <p className={styles.haveAcconunt}>
          Dont have an account?
          <NavLink to="/register" className={styles.haveAcconuntLink}>
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
