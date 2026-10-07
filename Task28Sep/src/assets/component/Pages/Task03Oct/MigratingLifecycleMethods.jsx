// import React, { Component } from "react";

// class MigratingLifecycleMethods extends Component {
//   state = { users: [], loading: true };

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => this.setState({ users: data, loading: false }));
//     console.log("Component did mount :", this.state.users);
//   }

//   render() {
//     if (this.state.loading) return <h2>Loading...</h2>;
//     return (
//       <div>
//         <h2>User List (Class)</h2>
//         <ul>
//           {this.state.users.map((u) => (
//             <li key={u.id} style={{ listStyle: "none" }}>
//               {u.id}. {u.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default MigratingLifecycleMethods;

// import { useState, useEffect } from "react";

// function MigratingLifecycleMethods() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <h2>Loading...</h2>;
//   return (
//     <div>
//       <h5>Task 2: Migrating Lifecycle Methods</h5>
//       <h6>User List (Functional)</h6>
//       <ul>
//         {users.map((u) => (
//           <li key={u.id} style={{ listStyle: "none" }}>
//             {u.id}. {u.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MigratingLifecycleMethods;

import { useState, useEffect } from "react";

function MigratingLifecycleMethods() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const linkStyle = {
    listStyle: "none",
    textDecoration: "none",
    color: "#1f2937",
    lineHeight: "1.5",
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <h2>Loading...</h2>;
  return (
    <div>
      <h5>Task 2: Migrating Lifecycle Methods</h5>
      <h6>User List (Functional)</h6>
      <ul>
        {users.map((u) => (
          <li key={u.id} style={linkStyle}>
            {u.id}. {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MigratingLifecycleMethods;
