import { Button, Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";

// Component 1: Auth context-ஐ use பண்ணும்
function WelcomeBar() {
  const { user, logout } = useAuth();
  return (
    <div className="d-flex align-items-center gap-3 mb-3">
      <h5 className="mb-0">Welcome, {user.username}!</h5>
      <Button size="sm" variant="danger" className="ms-auto" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

// Component 2: Theme context-ஐ use பண்ணும்
function ThemeBox() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="border rounded p-3 mb-3">
      Current theme: <b>{theme}</b>{" "}
      <Button size="sm" variant="secondary" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </div>
  );
}

// Component 3: Data context-ஐ use பண்ணும்
function UsersTable() {
  const { users, loading, error } = useData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.address.city}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

// Page
export default function Dashboard() {
  const { user } = useAuth();

  // Logout பண்ணும்போது user null ஆகும், அப்போ எதுவும் காட்டாத
  if (!user) return null;

  return (
    <Container className="py-4">
      <WelcomeBar />
      <ThemeBox />
      <h6>Users List</h6>
      <UsersTable />
    </Container>
  );
}
