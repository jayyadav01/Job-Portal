import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import dummy from "../../assets/dummy.webp";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from "react";
import { setUser } from "../../redux/authSlice";

function PopOver() {
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)
  const [show, setShow] = useState(false)
  const targetRef = useRef()
  const dispatch = useDispatch()

  const handleLogout = () => {
    Cookies.remove('token')
    dispatch(setUser(null));
    navigate("/")
  }

  const handleToggle = () => {
    setShow(!show)
  }

  const handleClickOutside = (event) => {
    if (targetRef.current &&
       !targetRef.current.contains(event.target) &&
      !event.target.closest(".popover")) {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="popover-container" ref={targetRef}>
        <OverlayTrigger
          show={show}
          trigger="click"
          rootClose={true}
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`} style={{ width: '200px' }}>
              <Popover.Header as="h3">
                <img
                  src={(user?.profile?.profilePhoto) ? user?.profile?.profilePhoto : dummy}
                  style={{ borderRadius: "50%" }}
                  width="40px"
                  height="40px"
                  alt="pic"
                />
                <p className="name">{user?.fullName}</p>
              </Popover.Header>
              <Popover.Body>
                {/* <p>Lorem ipsum dolor sit amet.</p> */}

                <div className="profile-box">
                  <div className="profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    <Link to="/profile" className="profile-button">Profile</Link>
                  </div>
                  <div className="logout">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                    <Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link>
                  </div>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <img
            onClick={handleToggle}
            src={(user?.profile?.profilePhoto) ? user?.profile?.profilePhoto : dummy}
            style={{ borderRadius: "50%" }}
            width="40px"
            height="40px"
            alt="pic"
          />
        </OverlayTrigger>
      </div>
    </>
  );
}

export default PopOver;
