import { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import { authApi } from "./ApiMethods/authApi";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    authApi
      .get("/employees") // Authorization: Bearer <token> thaanaa pogum
      .then((res) => setEmployees(res.data))
      .catch(() => setError("Data edukka mudiyala"));
  }, []);

  return (
    <div className="py-3">
      <h5>Employees</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table bordered>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{JSON.stringify(emp)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Employees;
