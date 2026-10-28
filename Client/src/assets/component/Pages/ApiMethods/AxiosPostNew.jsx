import { useEffect, useState } from "react";
import { userapi } from "./Instance";
import Table from "react-bootstrap/Table";

export default function AxiosPostNew() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const url = "/users";
      const response = await userapi.get(url);
      setUsers(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="h3 text-center text-primary">Customers</div>
      <div>{loading && <h4>Loading....</h4>} </div>
      <Table striped bordered hover>
        <thead className="table-active">
          <tr>
            <th>Canididate Name</th>
            <th>Canididate Email</th>
            <th>Canididate phone</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length != 0 ? (
            users.map((value, key) => {
              return (
                <tr>
                  <td>{value.name.firstname + " " + value.name.lastname}</td>
                  <td>{value.email}</td>
                  <td>{value.phone}</td>
                </tr>
              );
            })
          ) : (
            <tr colspan={3}>
              {" "}
              <td>No Users Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

// import { useEffect, useState } from "react";
// import { userapi } from "./Instance";
// import * as ob from "../../Pages/data/productsData";

// export default function AxiosPostNew() {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   console.log(ob.products);
//   const fetchCustomers = async () => {
//     try {
//       // const url = "/users";
//       // const response = await userapi.get(url);
//       // setUsers(response?.data);
//       setUsers(ob.products.filter((o) => o.id > 3));
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   return (
//     <>
//       <div className="h3 text-center text-primary">Customers</div>
//       <div>{loading && <h4>Loading....</h4>} </div>
//       <table className="table">
//         <tr>
//           <th>Canididate Name</th>
//           <th>Canididate Email</th>
//           <th>Canididate phone</th>
//         </tr>

//         {users && users.length != 0 ? (
//           users.map((value, key) => {
//             return (
//               <tr>
//                 <td>{value.id}</td>
//                 <td>{value.name}</td>
//                 <td>{value.price}</td>
//               </tr>
//             );
//           })
//         ) : (
//           <tr colspan={3}>
//             {" "}
//             <td>No Users Found</td>
//           </tr>
//         )}
//       </table>
//     </>
//   );
// }
