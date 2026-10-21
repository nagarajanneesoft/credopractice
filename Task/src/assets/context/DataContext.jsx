import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

// 1) பலகை
const DataContext = createContext();

// 2) Provider
export function DataProvider({ children }) {
  const { user } = useAuth(); // Auth-க்கு கீழ இருக்கிறதால இத use பண்ணலாம்

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return; // login பண்ணின பிறகு மட்டும் fetch

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Data load aagala 😕");
        setLoading(false);
      });
  }, [user]);

  return (
    <DataContext.Provider value={{ users, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

// 3) படிக்க
export const useData = () => useContext(DataContext);
