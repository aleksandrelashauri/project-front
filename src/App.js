import { useRoutes } from "react-router-dom";
import React from "react";
import routes from "./routes/routes";
import Container from "@mui/material/Container";

function App() {
  const routing = useRoutes(routes());
  return (
    <>
      <Container maxWidth="sm">{routing}</Container>
    </>
  );
}

export default App;
