// Import necessary libraries and components
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStaffMember, updateStaffMember } from "../crud";
import StaffMemberForm from "../components/StaffMemberForm";

const EditStaffMember = () => {
  // Declare variables using React hooks
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Fetch staff member data using React Query
  const {
    isLoading,
    isError,
    data: staffMember,
    error,
  } = useQuery({
    queryKey: ["staffMembers", id],
    queryFn: () => fetchStaffMember(id),
  });
  
  // Declare a mutation to update staff member data
  const updateStaffMemberMutation = useMutation({
    mutationFn: updateStaffMember,
    onSuccess: () => {
      // Invalidate the "staffMembers" query to update data in cache
      queryClient.invalidateQueries({ queryKey: ['staffMembers']});
      // Navigate back to the landing page
      navigate("/");
    },
  });

  // Handle the case where data is still loading
  if (isLoading) return "loading...";
  
  // Handle the case where there is an error
  if (isError) return `Error: ${error.message}`;

  // Handle form submission to update staff member data
  const handleSubmit = (updatedStaffMember) => {
    updateStaffMemberMutation.mutate({ id, ...updatedStaffMember });
  };

  // Render the StaffMemberForm with initial data
  return (
    <div>
      <StaffMemberForm onSubmit={handleSubmit} initialValue={staffMember} />
    </div>
  );
};

// Export the EditStaffMember component
export default EditStaffMember;
