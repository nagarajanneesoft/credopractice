import { Form } from "react-bootstrap";
import { useFormik } from "formik";

function LoginFormik() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <h5>Task 1B: Login (Formik)</h5>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            placeholder="name@gmail.com"
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            placeholder="name@123"
            onChange={formik.handleChange}
          />
        </Form.Group>
        <button type="submit" className="btn btn-success mt-2">
          Login
        </button>
      </Form>

      <h6>Email : {formik.values.email}</h6>
      <h6>Password : {formik.values.password}</h6>
    </div>
  );
}

export default LoginFormik;
