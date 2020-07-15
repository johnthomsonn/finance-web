import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import NavBar from "../navbar/Navbar";

const EditProfile = props => {

    const [balance, setBalance] = useState("");

    useEffect(() => setBalanceOnRender(), []);

    const setBalanceOnRender = () => {
        setBalance(window.sessionStorage.getItem("balance"));
    }

    return (<>
        <NavBar {...props} balance={balance} />
        <div className="edit-profile-container">

            Edit Profile
        </div>
    </>);
};
export default EditProfile;