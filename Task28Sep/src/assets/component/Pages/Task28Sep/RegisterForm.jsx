import { useFormik } from "formik";
import * as Yup from "yup";
import FormField from "../Task28Sep/ProductionRefactor";

// Yup schema: எல்லா rules ஒரே இடத்தில்
const validationSchema = Yup.object({
  username: Yup.string()
    .min(5, "Username குறைந்தது 5 characters")
    .required("Username தேவை"),
  email: Yup.string().email("சரியான email கொடுங்க").required("Email தேவை"),
  password: Yup.string()
    .min(6, "Password குறைந்தது 6 characters")
    .required("Password தேவை"),
});

// போலி API (2 seconds காத்திருக்கும்)
const fakeApi = (values) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email === "error@test.com") {
        reject(new Error("இந்த email ஏற்கனவே இருக்கு"));
      } else {
        resolve("ok");
      }
    }, 2000);
  });

function RegisterForm() {
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus(null); // பழைய message-ஐ அழி
      try {
        await fakeApi(values);
        setStatus({ type: "success", message: "Registration வெற்றி! 🎉" });
        resetForm();
      } catch (err) {
        setStatus({ type: "danger", message: err.message });
      }
    },
  });

  return (
    <div>
      <h5>Task 5: Production-Ready Register Form</h5>

      {formik.status && (
        <div className={`alert alert-${formik.status.type}`}>
          {formik.status.message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        <FormField label="Username" name="username" formik={formik} />
        <FormField label="Email" name="email" type="email" formik={formik} />
        <FormField
          label="Password"
          name="password"
          type="password"
          formik={formik}
        />

        <button
          type="submit"
          className="btn btn-success"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
