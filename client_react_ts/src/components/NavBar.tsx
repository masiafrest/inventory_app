import React from "react";
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/features/user/userSlice";
import { RootState } from "../redux/rootReducer";

//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function NavBar(props: any) {
  const dispath = useDispatch();
  const user: any = useSelector((state: RootState) => state.user);
  const handleSignOut = () => {
    console.log("handle sign out lcick");
    dispath(signOut());
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
          {user.authenticated ? renderLogOutButton : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
