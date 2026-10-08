import { Form } from "react-bootstrap";
import { useFormik } from "formik";

function RegistrationFormik() {
  const formik = useFormik({
    initialValues: { name: "", email: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <h5>Task 1B: Register (Formik)</h5>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
            placeholder="name"
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            placeholder="name@123"
            onChange={formik.handleChange}
          />
        </Form.Group>
        <button type="submit" className="btn btn-success mt-2">
          Register
        </button>
      </Form>

      <h6>Name : {formik.values.name}</h6>
      <h6>Email : {formik.values.email}</h6>
    </div>
  );
}

export default RegistrationFormik;
