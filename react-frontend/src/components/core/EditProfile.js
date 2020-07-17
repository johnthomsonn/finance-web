import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import NavBar from "../navbar/Navbar";
import EditBalance from "../other/EditBalance"

const EditProfile = props => {

    const [balance, setBalance] = useState("");

    useEffect(() => setBalanceOnRender(), []);

    const setBalanceOnRender = () => {
        setBalance(window.sessionStorage.getItem("balance"));
    }

    return (<>
        <NavBar {...props} balance={balance} />
        <div className="edit-profile-container container-fluid">
            <h5>Edit Profile</h5>

            <EditBalance {...props} balance={balance} updateBalance={setBalance} />

        </div>
    </>);
};
export default EditProfile;