import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const initialStudents = [
  { id: 1, name: "Alice", score: 90 },
  { id: 2, name: "Bob", score: 85 },
  { id: 3, name: "Charlie", score: 78 },
];

function HomePage() {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({ name: "", score: "" });
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
    if (!newStudent.name.trim() || !newStudent.score) return;

    const student = {
      id: Date.now(),
      name: newStudent.name.trim(),
      score: Number(newStudent.score),
    };

    setStudents((prev) => [...prev, student]);
    setNewStudent({ name: "", score: "" });
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleUpdateStudent = (id) => {
    const studentToUpdate = students.find((student) => student.id === id);
    if (!studentToUpdate) return;

    const updatedName = window.prompt("Enter new name:", studentToUpdate.name);
    const updatedScore = window.prompt(
      "Enter new score:",
      studentToUpdate.score,
    );

    if (updatedName === null || updatedScore === null) return;

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              name: updatedName.trim() || student.name,
              score: Number(updatedScore) || student.score,
            }
          : student,
      ),
    );
  };

  return (
    <main className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Student List</h5>
        </div>

        <div className="row g-2 mb-4 package-header">
          <div className="col-sm-3">
            <Form.Control
              type="text"
              placeholder="Search student by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-3">
            <Form.Control
              type="text"
              placeholder="Student name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="col-sm-3">
            <Form.Control
              type="number"
              placeholder="Score"
              value={newStudent.score}
              onChange={(e) =>
                setNewStudent((prev) => ({ ...prev, score: e.target.value }))
              }
            />
          </div>
          <div className="col-sm-2 text-center">
            <Button variant="success" onClick={handleAddStudent}>
              Add Student
            </Button>
          </div>
        </div>

        <div className="package-header">
          <Table striped bordered hover responsive>
            <thead>
              <tr className="active">
                <th>Name</th>
                <th>Score</th>
                <th>Result</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.score}</td>
                  <td>{student.score > 35 ? "Pass" : "Fail"}</td>
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

export default HomePage;
