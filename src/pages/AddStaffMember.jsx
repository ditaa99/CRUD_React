import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffMember } from "../crud";

import StaffMemberForm from "../components/StaffMemberForm";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Define a new mutation to create a staff member
  const createStaffMemberMutation = useMutation({
    mutationFn: createStaffMember, // The function that performs the mutation
    onSuccess: (data) => {
      // Invalidate the query for the staff member list so it will be refetched with the new data
      queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
      console.log("Success!");
      navigate(`/staffMember/${data.id}`); // Navigate to the newly created staff member's page
    },
  });

  // Handle the submission of the staff member form
  const handleAddUser = (staffMember) => {
    // Mutate the createStaffMember mutation with the new staff member data
    createStaffMemberMutation.mutate({
      id: crypto.randomUUID(), // Generate a random ID for the new staff member
      ...staffMember, // Spread in the rest of the staff member data from the form
    });
  };

  return (
    <div>
      {/* Render the staff member form, passing in the handleAddUser function and an empty initial value */}
      <StaffMemberForm onSubmit={handleAddUser} initialValue={{}} />
    </div>
  );
};

export default AddUser;
