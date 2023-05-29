import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Route, Routes } from "react-router-dom";
import EditStaffMember from "./pages/EditStaffMember";
import StaffMember from "./pages/StaffMember";
import StaffMemberList from "./pages/StaffMemberList";
import NavBar from "./components/NavBar";

import LandingPage from "./pages/LandingPage";
import AddStaffMember from "./pages/AddStaffMember";

function App() {
  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/staffmembers" element={<StaffMemberList />} />
        <Route path="/addstaffmember" element={<AddStaffMember />} />
        <Route path="/staffmember/:id" element={<StaffMember />} />
        <Route path="/staffmember/:id/edit" element={<EditStaffMember />} />
      </Routes>
    </>
  );
}

export default App;

