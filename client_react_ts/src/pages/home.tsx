import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Table from "../components/Table";

const Home = (props: { authenticated: boolean }) => {
  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {props.authenticated ? "true" : "false"}</pre>
      <Link to="/card">Card</Link>
    </div>
  );
};

function mapStateToProps(state: IRootState) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(Home);
