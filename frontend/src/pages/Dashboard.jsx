import { useEffect, useState } from "react";
import axios from "axios";
import LeadForm from "../components/LeadForm";
import LeadsList from "../components/LeadsList";

export default function Dashboard({ setIsLoggedIn }) {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

   const fetchLeads = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/leads`);

    setLeads(res.data);

    console.log(process.env.REACT_APP_API_URL);
  } catch (error) {
    console.error("Error fetching leads:", error);
  }
};
  useEffect(() => {
    fetchLeads();
  }, []);

  // FILTER
  const filteredLeads = leads.filter((lead) =>
    (lead.name || "").toLowerCase().startsWith(search.toLowerCase()) ||
    (lead.phone || "").toString().includes(search)
  );

  // LOGOUT
  const handleLogout = () => {
  localStorage.removeItem("token"); 
  setIsLoggedIn(false);
};

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header">
        <h1>Real Estate CRM</h1>

        <button onClick={handleLogout} className="logout-btn"> Logout</button>
      </div>

      {/* ADD LEAD */}
      <div className="card">
        <LeadForm fetchLeads={fetchLeads} />
      </div>

      {/* LEADS */}
      <div className="card">
        <h2>Leads</h2>

        {/*  SEARCH */}
        <input type="text" placeholder="Search by name or phone..."value={search}onChange={(e) => setSearch(e.target.value)}className="search-box"/>
        
        {/* TABLE */}
        <LeadsList leads={filteredLeads} fetchLeads={fetchLeads} />
      </div>
    </div>
  );
}