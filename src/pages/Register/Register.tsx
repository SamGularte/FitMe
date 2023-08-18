import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

//router
import { NavLink, useNavigate } from "react-router-dom";

//css
import styles from "./Register.module.css";

//axios
import axios from "axios";

//context
import { useBoolContext } from "../../context/BoolContext";

type Props = {};

export function containsOnlyLetters(str: string): boolean {
  if (/^[A-Za-z]+$/.test(str)) {
    return true;
  } else {
    return false;
  }
  return false;
}

const Register = (props: Props) => {
  const [responsed, setResponsed] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { booleanValue, setBooleanValue } = useBoolContext();

  setBooleanValue(false);

  const containsOnlyNumbers = (str: string) => {
    return /^[0-9]+$/.test(str);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = {
      fullName,
      username,
      email,
      password,
    };

    setError("");
    if (password !== confirmPassword) {
      alert("Passwords need to be the same");
    } else if (password.length < 6) {
      alert("Password must be 6 or more characters");
    } else if (containsOnlyLetters(password)) {
      alert("Password must contain numbers");
    } else if (containsOnlyNumbers(password)) {
      alert("Password must contain letters");
    } else {
      const apiUrl = "https://parseapi.back4app.com/users";
      const userData = {
        username: username,
        password: password,
        fullname: fullName,
        email: email,
      };

      const headers = {
        "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
        "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
        "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.post(apiUrl, userData, { headers });
        setResponsed(JSON.stringify(response.data));
        navigate("/login");
        console.log(user);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "fname") {
      setFullName(e.target.value);
    } else if (e.target.name === "Uname") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div className={styles.regContainer}>
      <h1 className={styles.regTitle}>Register</h1>
      <hr className={styles.regHorizontalLine} />
      <p className={styles.uLine}>Please Fill out form to Register</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_group}>
          <label htmlFor="fname">Full name</label>
          <input
            type="text"
            name="fname"
            onChange={handleChange}
            value={fullName}
            className={styles.input_field}
          ></input>
        </div>
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
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
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
        <div className={styles.form_group}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
            className={styles.input_field}
          ></input>
        </div>
        <button className={styles.btn}>Register</button>
        <p className={styles.haveAcconunt}>
          Yes i have an account?
          <NavLink to="/login" className={styles.haveAcconuntLink}>
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
