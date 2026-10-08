import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const initialStudents = [
  { id: 1, name: "Alice", score: 90 },
  { id: 2, name: "Bob", score: 85 },
  { id: 3, name: "Charlie", score: 78 },
];

function AboutPage() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) return true;

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.score.toString().includes(searchValue)
    );
  });

  const handleAddStudent = () => {
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Nagarajan",
        score: 100,
      },
    ]);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleUpdateStudent = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              name: "Nagarajansvs",
              score: 50,
            }
          : student,
      ),
    );
  };

  return (
    <main className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Student List 2</h5>
          <Button variant="success" onClick={handleAddStudent}>
            Add Student
          </Button>
        </div>

        <div className="row g-2 mb-4 package-header">
          <div className="col-md-6">
            <Form.Control
              type="search"
              placeholder="Search by name or score"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="package-header">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Name</th>
                <th>Score</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.score}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStudent(student.id)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </main>
  );
}

export default AboutPage;
