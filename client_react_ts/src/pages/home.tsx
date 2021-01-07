import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
// import Table from "../components/Table";

const Home = () => {
  const user: any = useSelector((state: RootState) => state.user);
  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {user.authenticated ? "true" : "false"}</pre>
      <Link to="/card">Card</Link>
    </div>
  );
};

export default Home;
