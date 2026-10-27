// import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";

// function AxiosMethods() {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const url = "https://fakestoreapi.com/users";
//       const response = await fetch(url);

//       // if (!response.ok) {
//       //   throw new Error(`Request failed with status ${response.status}`);
//       // }

//       const responseData = await response.json();
//       setUsers(responseData);
//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <h6 className="p-0 m-0">Fetch Method</h6>
//       <hr />

//       {loading && <h6>Loading...</h6>}
//       {error && <h6 className="text-danger">{error}</h6>}

//       {!loading && !error && users.length > 0 && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Username</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((value, key) => (
//               <tr key={value.id ?? key}>
//                 <td>{value.id}</td>
//                 <td>{value.name?.firstname}</td>
//                 <td>{value.name?.lastname}</td>
//                 <td>{value.username}</td>
//                 <td>{value.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {!loading && !error && users.length === 0 && (
//         <h6 className="text-center">No Data Found</h6>
//       )}
//     </>
//   );
// }

// export default AxiosMethods;
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function AxiosGetMethods() {
  const [loading, setloading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";

    try {
      const response = await axios.get(url);
      setUsers(response.data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h6 className="p-0 m-0">Axios Get Method</h6>
      <hr />

      <div>{loading && <h6>Loading...</h6>}</div>

      {users.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((value, key) => (
              <tr key={value.id ?? key}>
                <td>{value.id}</td>
                <td>{value.name}</td>
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

export default AxiosGetMethods;

// import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import axios from "axios";

// function AxiosGetMethods() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     createCustomer();
//   }, []);

//   async function createCustomer() {
//     const url = "https://fakestoreapi.com/users";

//     try {
//       const response = await axios.get(url);
//       setUsers(response?.data);
//       console.log("response data", [response.data]);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <h6 className="p-0 m-0">Axios Post Method</h6>
//       <hr />
//       {loading && <h6>Loading...</h6>}
//       {error && <div className="text-danger">{error}</div>}

//       {!loading && !error && users.length > 0 && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((data, key) => (
//               <tr key={key?.id}>
//                 <td>{data?.id}</td>
//                 <td>{data?.name?.firstname}</td>
//                 <td>{data?.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// }

// export default AxiosGetMethods;
