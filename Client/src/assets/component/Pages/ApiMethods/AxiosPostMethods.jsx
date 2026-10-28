// import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import axios from "axios";

// function AxiosPostMethods() {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     createCustomer();
//   }, []);

//   async function createCustomer() {
//     const url = "https://jsonplaceholder.typicode.com/users";
//     const userPayload = {
//       name: "Saravanan",
//       email: "test@gmail.com",
//     };

//     try {
//       const response = await axios.post(url, userPayload);
//       console.log("response======>", response.data);

//       // POST returns ONE object, so put it inside an array
//       setUsers([response.data]);
//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <h6 className="p-0 m-0">Axios Post Method</h6>
//       <hr />

//       {loading && <h6>Loading...</h6>}
//       {error && <h6 className="text-danger">{error}</h6>}

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
//               <tr key={data.id ?? key}>
//                 <td>{data.id}</td>
//                 <td>{data.name}</td>
//                 <td>{data.email}</td>
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

// export default AxiosPostMethods;

// import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import axios from "axios";

// function AxiosPostMethods() {
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

// export default AxiosPostMethods;

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function AxiosPostMethods() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function createCustomer() {
    const url = "https://fakestoreapi.com/products";
    const userPayload = {
      id: 0,
      title: "string",
      price: 0.1,
      category: "string",
    };

    try {
      const response = await axios.post(url, userPayload);
      // console.log("Response Data", [response]);
      console.log("Response Data======>", response);
      setUsers([response?.data]);
      //setUsers([{ ...userPayload, ...response.data }]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    createCustomer();
  }, []);

  return (
    <>
      <h6 className="p-0 m-0">Axios Post Method</h6>
      <hr />
      {loading && <h6>Loading...</h6>}
      {error && <div className="text-danger">{error}</div>}

      {!loading && !error && users.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>title</th>
              <th>price</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, key) => (
              <tr key={key?.id}>
                <td>{data?.id}</td>
                <td>{data?.title}</td>
                <td>{data?.price}</td>
                <td>{data?.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!loading && !error && users.length === 0 && (
        <h6 className="text-center">No Data Found</h6>
      )}
    </>
  );
}

export default AxiosPostMethods;
