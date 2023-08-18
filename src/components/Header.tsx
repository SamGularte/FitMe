import React from "react";

//router
import { NavLink } from "react-router-dom";

//css
import styles from "./Header.module.css";

//context
import { useBoolContext } from "../context/BoolContext";

//imgs
import headerLogo from "../imgs/Logo.png";
import bag from "../imgs/Bag.png";
import searchIcon from "../imgs/magnifyingGlass.jpeg";

type Props = {};

const Header = (props: Props) => {
  const { booleanValue, setBooleanValue } = useBoolContext();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <NavLink to="/">
          <img src={headerLogo} alt="logo icon" />
        </NavLink>
      </div>
      {booleanValue && (
        <div className={styles.restContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Enter item or restaurant you are looking for"
            />
            <button>
              <img src={searchIcon} />
            </button>
          </div>
          <NavLink to="/" className={styles.bagIcon}>
            <img src={bag} alt="bag icon" />
          </NavLink>

          <NavLink to="/login" className={styles.signButton}>
            Sign in
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
