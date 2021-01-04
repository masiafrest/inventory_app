import React from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { signOutUser } from "../redux/actions/userActions";
//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function NavBar(props: any) {
  const handleSignOut = () => {
    console.log("handle sign out lcick");
    props.signOutUser();
  };
  const renderLogOutButton = (
    <Button
      color="inherit"
      component={Link}
      to="/signin"
      onClick={handleSignOut}
    >
      LogOut
    </Button>
  );
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {props.authenticated ? renderLogOutButton : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state: IRootState) {
  return { authenticated: state.user.authenticated };
}

const mapDispatchToProps = { signOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
