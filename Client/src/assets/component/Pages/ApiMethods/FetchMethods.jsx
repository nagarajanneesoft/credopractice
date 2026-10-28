import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function FetchMethods() {
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      const url = "https://fakestoreapi.com/users";
      const option = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, option);
      const responseData = await response.json();
      setusers(responseData);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h6 className="p-0 m-0">Axios Method</h6>
      <hr />

      <div>{loading && <h6>Loading...</h6>}</div>

      {users.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((value, key) => (
              <tr key={value.id ?? key}>
                <td>{value.id}</td>
                <td>{value.name?.firstname}</td>
                <td>{value.name?.lastname}</td>
                <td>{value.username}</td>
                <td>{value.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <tr>
          <th colSpan={4} className="text-center">
            No Data Found
          </th>
        </tr>
      )}
    </>
  );
}

export default FetchMethods;
