import React from "react";

//router
import { NavLink } from "react-router-dom";

//css
import styles from "./Footer.module.css";

//imgs
import footerLogo from "../imgs/footerLogo.png";
import facebook from "../imgs/facebookIcon.png";
import instagram from "../imgs/intagramIcon.png";
import twitter from "../imgs/twitterIcon.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={footerLogo} alt="Footer logo" />
          </NavLink>
        </div>
        <nav className={styles.navigation}>
          <p>About us</p>
          <p>Delivery</p>
          <p>Help & Support</p>
          <p>T&C</p>
        </nav>
        <div className="logo-col">
          <p>
            Contact: <a href={`tel:+91 123456789`}>+91 123456789</a>
          </p>
        </div>
      </div>
      <div className={styles.icons}>
        <a href={``}>
          <img src={facebook} alt="Facebook logo" />
        </a>
        <a href={``}>
          <img src={instagram} alt="Instagram logo" />
        </a>
        <a href={``}>
          <img src={twitter} alt="Twitter logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
