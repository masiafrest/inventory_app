import React from "react";
import { connect } from "react-redux";
// import Table from "../components/Table";

const Home: React.FC<{ authenticated: boolean }> = (props) => {
  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {props.authenticated ? "true" : "false"}</pre>
      {/* <Table /> */}
    </div>
  );
};

function mapStateToProps(state: IRootState) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(Home);
