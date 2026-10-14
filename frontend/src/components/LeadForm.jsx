import { useState } from "react";
import axios from "axios";

export default function LeadForm({ fetchLeads }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/leads`, formData)
    fetchLeads();

    setFormData({
      name: "",
      phone: "",
      email: "",
      budget: "",
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h2>Add Lead</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
        <input name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} required />
        <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
        <input name="budget" value={formData.budget} placeholder="Budget" onChange={handleChange} />

        <button type="submit">Save Lead</button>
      </form>
    </div>
  );
}