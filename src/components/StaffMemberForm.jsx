import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const UserForm = ({ onSubmit, initialValue }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dateofbirth: Yup.date().required('Birthdate is required'),
    account: Yup.string().required('Account is required'),
    companyname: Yup.string().required('Company name is required'),
    ccardnumber: Yup.string().required('Credit card number is required'),
    jobarea: Yup.string().required('Job area is required'),
    address: Yup.string().required('Address is required'),
  });

  return (
    <div className="d-flex justify-content-center">
      <Card className="mx-auto" style={{ width: '500px', margin: 'auto' }}>
        <Card.Header>Add Staff Member</Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Field type="text" name="name" placeholder="John Doe" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="name" className="invalid-feedback" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field type="email" name="email" placeholder="john.doe@example.com" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="email" className="invalid-feedback" />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <Field type="text" name="address" placeholder="Street, City, State, Country" className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="address" className="invalid-feedback" />
                </div>
                <div className="mb-3">
                  <label htmlFor="dateofbirth" className="form-label">Date of Birth</label>
                  <Field type="date" name="dateofbirth" placeholder="YYYY-MM-DD" className={`form-control ${errors.dateofbirth && touched.dateofbirth ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="dateofbirth" className="invalid-feedback" />
                </div>
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">Account</label>
                  <Field type="text" name="account" placeholder="LT12 3456 7890 1234 5678" className={`form-control ${errors.account && touched.account ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="account" className="invalid-feedback" />
                </div>
                <div className="mb-3">
                  <label htmlFor="jobarea" className="form-label">Job Area</label>
                  <Field type="text" name="jobarea" placeholder="Marketing, Directives, etc." className={`form-control ${errors.jobarea && touched.jobarea ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="jobarea" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="companyname" className="form-label">Company Name</label>
                  <Field type="text" name="companyname" placeholder="Acme Corporation" className={`form-control ${errors.companyname && touched.companyname ? 'is-invalid': ''}`} /> 
                  <ErrorMessage name="companyname" className="invalid-feedback" />
                </div> 
                <div className="mb-3"> 
                  <label htmlFor="ccardnumber" className="form-label">Credit Card Number</label> 
                  <Field type="text" name="ccardnumber" placeholder="XXXX XXXX XXXX XXXX" className={`form-control ${errors.ccardnumber && touched.ccardnumber ? 'is-invalid' : ''}`}/>
                  <ErrorMessage name="ccardnumber" className="invalid-feedback" />
                </div>

                <div className="mt-3">
                  <Button type="submit" variant="primary" className="me-3">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserForm;

