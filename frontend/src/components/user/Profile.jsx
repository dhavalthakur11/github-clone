import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { useAuth } from "../../authContext";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "Username" });
  const [repositories, setRepositories] = useState([]);
  const {setCurrentUser} = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    const fetchRepositories = async () => {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:3000/repo/user/${userId}`);
      const data = await response.json();

      setRepositories(data.repositories);
      console.log(data);
    };
    fetchUserDetails();
    fetchRepositories();
  }, []);

  return (
    <>
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          {" "}
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button
        onClick={()=>{
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>
      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <h3>Repositories</h3>
          {repositories.map((repo) => {
            return (
              <div key={repo._id} className="repo-card">
                  <h4 className="repo-name">{repo.name}</h4>
                {/* <p className="description">{repo.description}</p> */}
                <div className="repo-details">
                  <span className="language">Language: JavaScript</span>
                  <span className="forks">🍴 50 Forks</span>
                </div>
              </div>
            );
          })}
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
