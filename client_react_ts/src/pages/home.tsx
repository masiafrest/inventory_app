import React from "react";
import { connect } from "react-redux";

const Home: React.FC<{ authenticated: boolean }> = (props) => {
  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {props.authenticated ? "true" : "false"}</pre>
    </div>
  );
};

function mapStateToProps(state: IRootState) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(Home);
