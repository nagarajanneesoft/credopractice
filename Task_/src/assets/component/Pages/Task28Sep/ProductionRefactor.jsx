function ProductionRefactor({ label, name, type = "text", formik }) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`form-control ${hasError ? "is-invalid" : ""}`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {hasError && (
        <div className="invalid-feedback">{formik.errors[name]}</div>
      )}
    </div>
  );
}

export default ProductionRefactor;
