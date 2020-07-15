import React from "react";
import NavBar from "../navbar/Navbar";

const Page404 = props => {

  return (<>

    <NavBar {...props} />
    <div className=" jumbotron alert-danger" style={{ display: "flex", justifyContent: "center", fontSize: "1.75rem", border: "2px solid #a8423d" }}>
      {` ${props.location.pathname.substr(1)} Page cannot be found`}
    </div>
  </>);
};

export default Page404;
