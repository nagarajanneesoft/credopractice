import axios from "axios";

const API = "http://localhost:5000/api";

function BearerTokenPage() {
  const handleClick = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${API}/resend-otp`, {
      username: "admin",
      otp: 123,
    });
  };
  return (
    <>
      <h6 className="p-0 m-0">Bearer Token Page</h6>
      <hr />
      <button type="button" className="btn btn-success" onClick={handleClick}>
        Bearer Token Trigger
      </button>
    </>
  );
}

export default BearerTokenPage;
