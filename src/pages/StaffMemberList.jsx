import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import { deleteStaffMember, fetchStaffMembers } from "../crud";
import Form from "react-bootstrap/Form";

const StaffMemberList = () => {

  // useNavigate is a hook from the react-router-dom library that allows us to navigate between pages in our app
  const navigate = useNavigate();
  // useQueryClient is a hook from react-query library that returns a reference to the query client instance that can be used to invalidate and refetch queries.
  const queryClient = useQueryClient();
  
  // useState is a hook to manage the state of variables inside the component.
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deletingStaffMemberId, setDeletingStaffMemberId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStaffMembers, setFilteredStaffMembers] = useState([]);

  // useQuery is a hook from react-query library that fetches data and manages the state of the query.
  const {
    isLoading,
    isError,
    data: staffMembers,
    error,
  } = useQuery({
    queryKey: ["staffMembers"],
    queryFn: fetchStaffMembers,
  });

  // useMutation is a hook from react-query library that manages mutations (create, update, delete) and their state.
  const deleteStaffMemberMutation = useMutation({
    mutationFn: deleteStaffMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
      setShowToast(true);
    },
  });

  // handleDelete is called when the user clicks the "Delete" button. It sets the ID of the staff member to be deleted and shows the confirmation modal.
  const handleDelete = (id) => {
    setDeletingStaffMemberId(id);
    setShowConfirmationModal(true);
  };

  // confirmDelete is called when the user confirms the deletion in the confirmation modal. It calls the deleteStaffMemberMutation function and hides the confirmation modal.
  const confirmDelete = () => {
    deleteStaffMemberMutation.mutate(deletingStaffMemberId);
    setShowConfirmationModal(false);
  };

  // cancelDelete is called when the user cancels the deletion in the confirmation modal. It hides the confirmation modal.
  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };

  // handleSearchChange is called when the user types into the search box. It filters the staffMembers array based on the query and updates the filteredStaffMembers state variable.
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter staff members based on the search query
    const filtered = staffMembers.filter((staffMember) => {
      const { name, email } = staffMember;
      return name.toLowerCase().includes(query.toLowerCase()) || email.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredStaffMembers(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Render the staff member list
  return (
    <div className="mx-auto my-5" style={{ backgroundColor: "#fae0e4" }}>
    <Card>
        <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
                <span>Staff</span>
                <div className="search-input-container">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
      </Card.Header>
      <Card.Body>
        
        {staffMembers.length === 0 ? (
          <div>No staff members found.</div>
        ) : (
          <Table responsive striped hover>
            <thead>
                   <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Account</th>
                <th>Job Area</th>
                <th>Company Name</th>
                <th>Credit Card Number</th>
                <th colSpan="3">Action</th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery ? filteredStaffMembers : staffMembers).map((staffMember, index) => (
                <tr key={staffMember.id}>
                 <td>{index + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/staffmember/${staffMember.id}`)}
                  >
                    {staffMember.name}
                  </td>
                  <td>{staffMember.email}</td>
                  <td>{staffMember.address}</td>
                  <td>{staffMember.dateofbirth}</td>
                  <td>{staffMember.account}</td>
                  <td>{staffMember.jobarea}</td>
                  <td>{staffMember.companyname}</td>
                  <td>{staffMember.ccardnumber}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/staffmember/${staffMember.id}`)}
                    >
                      View
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/staffmember/${staffMember.id}/edit`)}
                    >
                      Edit
                    </Button>{" "}
                  </td>
                                    <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(staffMember.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>

   
     {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this staff member?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
      show={showToast}
      onClose={() => setShowToast(false)}
      delay={3000}
      autohide
      className="custom-toast" // Apply custom CSS class
    >
      <Toast.Header>
        <strong className="me-auto">Success</strong>
      </Toast.Header>
      <Toast.Body>Staff member deleted successfully.</Toast.Body>
    </Toast>
  </div>
);

};

export default StaffMemberList;
