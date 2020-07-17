import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./DeleteProfile.css"
import { signOut } from "../../js/methods"

const DeleteProfile = props => {

    const [error, setError] = useState("");

    const deleteProfile = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}`, {
            method: "DELETE",
            mode: "cors",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError("There was an error, could not delete user");
                }
                else {
                    signOut(() => props.history.push("/"));
                }
            })
            .catch(err => console.log(err));

    }


    return (<>

        <div className="delete-profile-div">
            Delete Profile:
            <button className="btn btn-danger btn-raised" data-toggle="modal" data-target="#confirmDelete">Delete Profile</button>
        </div>

        <div
            className="alert alert-danger"
            style={{ display: error.length ? "" : "none" }}
        >
            {error}
        </div>


        <div className="modal fade" id="confirmDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="title">Delete Entire Profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete your profile? This will permanently delete <strong style={{ color: "red", textDecoration: "underline" }}> everything </strong>
                         from the database and <strong style={{ color: "red", textDecoration: "underline" }}> cannot</strong> be undone
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-raised" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={deleteProfile} data-dismiss="modal">Delete Entire Profile</button>
                    </div>
                </div>
            </div>
        </div>

    </>);
};

export default DeleteProfile;