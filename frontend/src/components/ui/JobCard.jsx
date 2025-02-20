import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

const JobCard = ({ jobs }) => {
  const navigate = useNavigate();

  const handleCard = (jobId) => {
    navigate(`/description/${jobId}`);
  };

  return (
    <>
      <Row xs={1} sm={2} md={3} className="g-4" style={{ width: "100%" }}>
        {jobs.map((ele) => {
          let current = new Date();
          let jobDate = new Date(ele?.createdAt);

          let diffInMs = current - jobDate;
          let daysBetween = Math.round(diffInMs / (1000 * 60 * 60 * 24));
          if (daysBetween > 30) {
            daysBetween = "30+";
          }

          return (
            <Col key={ele?._id}>
              <Card className="h-100" onClick={() => handleCard(ele?._id)}>
                <Card.Body>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Card.Title> {ele?.title}</Card.Title>
                    <img width="50" height="30" src={ele?.company?.logo} alt="company-logo"></img>
                  </div>

                  <Card.Text>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>{ele?.company?.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                      color="red"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                    </svg>
                    <span style={{ marginLeft: "5px" }}>{ele?.location}</span>
                    <br />
                    {/* <p style={{ fontSize: "14px" }}>{ele?.requirements}</p> */}
                  </Card.Text>
                  <Stack direction="horizontal" gap={2}>
                    <Badge
                      bg="#F3F2F1"
                      text="#595959"
                      style={{
                        backgroundColor: "#F3F2F1",
                        color: "#595959",
                        padding: "5px 10px",
                        fontSize: "14px",
                      }}
                    >
                      {ele?.position} Positions
                    </Badge>
                    <Badge
                      bg="#F3F2F1"
                      text="#595959"
                      style={{
                        backgroundColor: "#F3F2F1",
                        color: "#595959",
                        padding: "5px 10px",
                        fontSize: "14px",
                      }}
                    >
                      {ele?.jobType}
                    </Badge>
                    <Badge
                      bg="#F3F2F1"
                      text="#595959"
                      style={{
                        backgroundColor: "#F3F2F1",
                        color: "#595959",
                        padding: "5px 10px",
                        fontSize: "14px",
                      }}
                    >
                      {ele?.experience} Exp
                    </Badge>
                  </Stack>
                  <p
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      marginBottom: "0",
                      paddingTop: "10px",
                    }}
                  >
                    Posted {daysBetween} days ago
                  </p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default JobCard;
