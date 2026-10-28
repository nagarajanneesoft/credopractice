// import { useFormik } from "formik";
// import * as Yup from "yup";

// // Yup schema: rules இங்க தான் define பண்றோம்
// const validationSchema = Yup.object({
//   username: Yup.string()
//     .min(4, "Username குறைந்தது 4 characters இருக்கணும்")
//     .required("Username தேவை"),
//   password: Yup.string()
//     .min(6, "Password குறைந்தது 6 characters இருக்கணும்")
//     .required("Password தேவை"),
// });

// function YupForm() {
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Form values:", values);
//     },
//   });

//   return (
//     <div>
//       <h5>Simple Yup Validation Form</h5>
//       <form onSubmit={formik.handleSubmit} noValidate>
//         <div className="mb-3">
//           <label className="form-label">Username</label>
//           <input
//             type="text"
//             name="username"
//             className={`form-control ${
//               formik.touched.username && formik.errors.username
//                 ? "is-invalid"
//                 : ""
//             }`}
//             value={formik.values.username}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.username && formik.errors.username && (
//             <div className="invalid-feedback">{formik.errors.username}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             name="password"
//             className={`form-control ${
//               formik.touched.password && formik.errors.password
//                 ? "is-invalid"
//                 : ""
//             }`}
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <div className="invalid-feedback">{formik.errors.password}</div>
//           )}
//         </div>

//         <button type="submit" className="btn btn-success">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default YupForm;

import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Username Min 4 characters")
    .required("Username required"),
  password: Yup.string()
    .min(6, "Password Min 6 characters")
    .required("Password required"),
});

function YupForm() {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {<div className="text-danger">{formik.errors.username}</div>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {<div className="text-danger">{formik.errors.password}</div>}
      </Form.Group>

      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default YupForm;
