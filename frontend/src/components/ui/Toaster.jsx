import Toast from "react-bootstrap/Toast";
import logo from "../../assets/jobportal_logo.jpg";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";

function Toaster({ message, variant }) {
  const [show, setShow] = useState(true);
  return (
    <>
      <ToastContainer className="position-fixed top-0 end-0 p-3" style={{ zIndex: 10 }}>
        <Toast
          className="d-inline-block m-1"
          bg={variant.toLowerCase()}
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          animation={true}
        >
          <Toast.Header>
            <img
              width="30px"
              height="30px"
              style={{ borderRadius: "50%" }}
              src={logo}
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Job Portal</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body
            className={variant === "Dark" && "text-white"}
            style={{ color: "#fff" }}
          >
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Toaster;
