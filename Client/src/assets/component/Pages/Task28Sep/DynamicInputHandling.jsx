import { Formik, Form, Field, FieldArray } from "formik";

function DynamicInputHandling() {
  return (
    <div>
      <h5>Task 4: Add Skills</h5>
      <Formik
        initialValues={{ skills: [""] }}
        onSubmit={(values) => {
          console.log("Skills:", values.skills);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="skills">
              {({ push, remove }) => (
                <div>
                  {values.skills.map((skill, index) => (
                    <div key={index} className="d-flex gap-2 mb-2">
                      <Field
                        name={`skills.${index}`}
                        className="form-control"
                        placeholder={`Skill ${index + 1}`}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={() => push("")}
                  >
                    + Add Skill
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit" className="btn btn-success">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DynamicInputHandling;
