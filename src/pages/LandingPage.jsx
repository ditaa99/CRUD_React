// This is a functional component for the landing page of the project
import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const LandingPage = () => {
return (
<div className="landing center-container">

  {/* This section contains a brief introduction about the project owner */}
  <div className="card-container">
    <Card className="card">
      <Card.Header className="card-header">
        <h2>Welcome to My Project</h2>
      </Card.Header>
      <Card.Body className="card-body">
        <h4>About Me</h4>
        <p>
        Hi, I'm Dita, a Computer Science student. I'm passionate about developing web applications and exploring new technologies. I'm fascinated by ML and I aim tu pursue it on my further studies :)

        </p>
      </Card.Body>
      <Card.Footer className="card-footer">
        <p>© {new Date().getFullYear()} Dita - All rights reserved</p>
      </Card.Footer>
    </Card>
  </div>

  {/* This section provides information about the project and provides a button to navigate to the staff members page */}
  <div className="card-container">
    <Card className="card elevated">
      <Card.Header className="card-header">
        <h2>Project Description</h2>
      </Card.Header>
      <Card.Body className="card-body">
        <p>
          This project is focused on managing staff members. It provides functionalities to add, edit, and delete staff members. You can also search for staff members by their name or email.
        </p>
        <Link to="/staffmembers">
          <Button variant="primary" className="btn">
            View Staff Members
          </Button>
        </Link>
      </Card.Body>
    </Card>
  </div>

  {/* This section is an additional section to showcase more information about the project or the project owner */}
  <div className="card-container">
    <Card className="card">
      <Card.Header className="card-header">
        <h2>Additional Section</h2>
      </Card.Header>
      <Card.Body className="card-body">
        <p>
          This is an additional section to showcase more information about your project or yourself.
        </p>
      </Card.Body>
    </Card>
  </div>

</div>
);
};

export default LandingPage;