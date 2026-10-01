import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  // username: குறைந்தது 5 characters
  if (!values.username) {
    errors.username = "Username Required";
  } else if (values.username.length < 5) {
    errors.username = "Username Min 5 characters";
  }

  // email: valid pattern
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Please Correct the email";
  }

  return errors;
};

function FormikValidation() {
  const formik = useFormik({
    initialValues: { username: "", email: "" },
    validate,
    onSubmit: (values) => {
      console.log("Profile updated:", values);
    },
  });

  return (
    <div>
      <h5>Task 3: Profile Update</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <small className="text-danger">{formik.errors.username}</small>
          )}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-danger">{formik.errors.email}</small>
          )}
        </div>

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
      <h6>username : {formik.values.username}</h6>
      <h6>Email : {formik.values.email}</h6>
    </div>
  );
}

export default FormikValidation;
