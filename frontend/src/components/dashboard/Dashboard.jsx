import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchReasult, setSearchResult] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    try {
      const fetchRepositories = async () => {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );
        const data = await response.json();

        setRepositories(data.repositories);
        console.log(data);
      };

      const fetchSuggestedRepositories = async () => {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();

        setSuggestedRepositories(data);
      };

      fetchRepositories();
      fetchSuggestedRepositories();
    } catch (err) {
      console.log("Error during Fetching Repositories : ", err);
    }
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResult(repositories);
    } else {
      const filteredRepository = repositories.filter((repo) => {
        repo.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResult(filteredRepository);
    }
  }, [searchQuery, repositories]);

  return (
    <><Navbar/>
    <section id="dashboard">
      <aside>
        <h3>Suggested Repositories</h3>
        {suggestedRepositories.map((repo)=>{
          return <div key={repo._id}>
            <h4>{repo.name}</h4>
            <p>{repo.description}</p>
          </div>
        })}
      </aside>
      <main>
        <h2>Your Reposirtories</h2>
        <div id="search">
          <input type="text" value={searchQuery} placeholder="Search.." onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
        {searchReasult.map((repo)=>{
          return <div key={repo._id}>
            <h4>{repo.name}</h4>
            <p>{repo.description}</p>
          </div>
        })}
      </main>
      <aside>
        <h3>Upcoming Events</h3>
        <ul>
          <li>
            <p>Tech Conference - Dec 15</p>
          </li>
          <li>
            <p>Devloper Meetup - Dec 25</p>
          </li>
          <li>
            <p>React Summit - Dec 29</p>
          </li>
        </ul>
      </aside>
    </section>
    </>
  );
};

export default Dashboard;
