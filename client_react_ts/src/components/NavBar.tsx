import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/features/user/userSlice";
import { RootState } from "../redux/rootReducer";

//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";

function NavBar(props: any) {
  const dispath = useDispatch();
  const user: any = useSelector((state: RootState) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = () => {
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

  const toggleDrawer = (isOpen: boolean) => (
    e: React.KeyboardEvent | React.MouseEvent
  ) => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/show/items">Search Item</NavLink>
            <NavLink to="/usuarios">Search Usuario</NavLink>
            <NavLink to="/table">orderTable</NavLink>
            <NavLink to="/recibo">recibos</NavLink>

            {user.authenticated ? renderLogOutButton : null}
          </Drawer>
          {/* {location.pathname === "/showData" ? <SearchBar /> : null} */}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
