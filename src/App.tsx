import { useLocalStorage } from "./hooks/useLocalStorage";
import { QueryContext, QueryProvider } from "./context/QueryContext";
import { Navbar } from "./components/Navbar";
import { Container } from "react-bootstrap";
import { NavProvider } from "./context/NavContext";
import { Home } from "./pages/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./App.css"

function App() {
  const initial = [
    {
      doc: {
        _key: "null",
        _id: "null",
        _rev: "null",
        country: "null",
        longitude: 0,
        true_sighting_id: "null",
        timestamp: "badTdata",
        latitude: 0,
        species: "Bad Data",
      },
      edges: [],
      connectedDocs: [],
    },
  ];
  const [queryData, setQueryData] = useLocalStorage("exoplanet", initial);
  const [initialRender, setInitialRender] = useLocalStorage("initial", 1);
  //const [initialRender, setInitialRender] = useState(1);
  // useEffect(() => {
  //   setQueryData(queryData);
  // }, [queryData]);
  
  
  return (
    <div className="home-container">
    <Router> {/* Wrap the entire app with the Router */}
      <QueryProvider >
        <NavProvider  >
          <Navbar />
        </NavProvider>
        <Container >
          <Home />
        </Container>
      </QueryProvider>
    </Router>
    </div>
  );
}
export default App;
