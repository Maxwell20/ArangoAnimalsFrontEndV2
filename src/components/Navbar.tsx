import { Button, Stack, Container, Navbar as NavbarBS } from "react-bootstrap";
import { useQuery } from "../context/NavContext";
import React from "react"

export function Navbar() {
  const { openQuery } = useQuery();
  const history = ["history1", "history2", "history3"];
  return (
   
      <NavbarBS sticky="top" className="bg-white shadow-lg mb-3">
        <Container>
          <Stack
            direction="horizontal"
            gap={4}
            className="d-flex align-items-center"
          >
            {/* {history.map((item) => (
              <Button>{item}</Button>
            ))} */}
          </Stack>

          <Button
            onClick={openQuery}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg
              height="30"
              viewBox="3.5 0 21 21"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4.5 6.5h12" />
                <path d="m4.498 10.5h11.997" />
                <path d="m4.5 14.5h11.995" />
              </g>
            </svg>
          </Button>
        </Container>
      </NavbarBS>
  );
}
