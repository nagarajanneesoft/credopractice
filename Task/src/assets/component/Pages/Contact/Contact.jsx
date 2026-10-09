import { Link } from "react-router-dom";

function Contact() {
  return (
    <>
      <h6>Contact Us</h6>

      {/* <div className="contact-links">
        <ul>
          <li>
            <Link to="/user/username">Username</Link>
          </li>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
        </ul>
      </div> */}

      <div className="contact-info">
        <ul>
          <li>
            <Link to="/user/username">Username</Link>
          </li>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Contact;
