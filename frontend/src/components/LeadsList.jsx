import axios from "axios";
import toast from "react-hot-toast";

export default function LeadsList({ leads, fetchLeads }) {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/leads/${id}`);

      toast.success("Lead deleted 🗑️");

      fetchLeads();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/leads/${id}`,
        { status: newStatus } 
      );

      toast.success("Status updated");

      fetchLeads();
    } catch {
      
      toast.error("Update failed ❌");
    }
  };
  return (
    <div>
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No leads found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.budget}</td>

                <td>
                  <select className={`status-${lead.status.toLowerCase()}`} value={lead.status} onChange={(e) =>handleStatusChange(lead._id, e.target.value)}>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Closed</option>
                  </select>
                </td>

                <td>
                  <button onClick={() => handleDelete(lead._id)} className="delete-btn"> Delete  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}