// Import necessary modules and functions
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStaffMember, deleteStaffMember } from "../crud";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

// Define the StaffMember component
const StaffMember = () => {
// Declare necessary variables with the help of React hooks
const navigate = useNavigate();
const { id } = useParams();
const queryClient = useQueryClient();

// Fetch the data of a specific staff member by using the useQuery hook
const { isLoading, data: staffMember, error } = useQuery({
queryKey: ["staffMembers", id],
queryFn: () => fetchStaffMember(id),
staleTime: 600000, // cache for 10 minutes
});

// Delete a staff member with the help of the useMutation hook
const deleteMutation = useMutation(deleteStaffMember, {
onSuccess: () => {
// Invalidate the queries related to the deleted staff member and the staff member list
queryClient.invalidateQueries("staffMembers");
queryClient.invalidateQueries(["staffMembers", id]);
// Navigate back to the home page
navigate("/");
},
});

// Define the functions to handle edit and delete actions
const handleEdit = () => {
  navigate(`/staffmember/${id}/edit`);
};

const handleDelete = () => {
deleteMutation.mutate(id);
};

// Render the StaffMember component
if (isLoading) return "loading...";
if (error) return `Error: ${error.message}`;

return (
<div className="center-container">
<div className="card-container">
<div className="card-header">
<h2>{staffMember.name}</h2>
</div>
<div className="card-body">
<ul className="list-group">
<li className="list-group-item">
<strong>Email:</strong> {staffMember.email}
</li>
<li className="list-group-item">
<strong>Birth Date:</strong> {staffMember.dateofbirth}
</li>
<li className="list-group-item">
<strong>Account:</strong> {staffMember.account}
</li>
<li className="list-group-item">
<strong>Job Area:</strong> {staffMember.jobarea}
</li>
<li className="list-group-item">
<strong>Company Name:</strong> {staffMember.companyname}
</li>
<li className="list-group-item">
<strong>Credit Card Number:</strong> {staffMember.ccardnumber}
</li>
</ul>
</div>
<div className="card-footer">
<button className="btn btn-primary" onClick={handleEdit}>
Edit
</button>
<button
         className="btn btn-danger"
         onClick={handleDelete}
         disabled={deleteMutation.isLoading}
       >
{deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
</button>
</div>
</div>
</div>
);
};

// Export the StaffMember component as the default module
export default StaffMember;