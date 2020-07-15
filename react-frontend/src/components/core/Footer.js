import React from "react";
import "./Footer.css";

const Footer = props => {
  return (<>
    <footer>
      <p>
        © John Thomson {new Date(Date.now()).getUTCFullYear()}
      </p>
    </footer>
  </>);
};

export default Footer;
