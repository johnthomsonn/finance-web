import React from "react";
import "./Footer.css";

const Footer = props => {
  return (<>
    <footer>
      <p>
        © John Thomson 2020 - {new Date(Date.now()).getUTCFullYear()}
      </p>
    </footer>
  </>);
};

export default Footer;
