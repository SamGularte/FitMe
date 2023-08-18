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

  const [responsed, setResponse] = useState<string>("");

  setBooleanValue(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://parseapi.back4app.com/login",
        {
          username,
          password,
        },
        {
          headers: {
            "X-Parse-Application-Id":
              "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
            "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
            "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
            "X-Parse-Revocable-Session": "1",
          },
        }
      );
      navigate("/");

      console.log("Login successful", response.data);
      // Faça algo com a resposta, como redirecionar o usuário ou atualizar o estado global de autenticação.
    } catch (error) {
      console.error("Login failed", error);
      // Lida com erros de autenticação, como exibir uma mensagem de erro para o usuário.
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
