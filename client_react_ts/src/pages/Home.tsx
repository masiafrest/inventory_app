import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { reciboPaths, addPaths, showPaths } from "../paths";
import { Button, Divider, Grid } from "@material-ui/core";

const Home = () => {
  const user: any = useSelector((state: RootState) => state.user);

  const addPathsBtn = addPaths.map((path) => {
    return (
      <Grid item key={path}>
        <Button variant="contained">
          <Link to={path}>Agregar {path.slice(5)}</Link>
        </Button>
      </Grid>
    );
  });
  const showPathsBtn = showPaths.map((path) => {
    return (
      <Grid item key={path}>
        <Button variant="contained">
          <Link to={path}>Ver {path.slice(6)}</Link>
        </Button>
      </Grid>
    );
  });


  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {user.authenticated ? "true" : "false"}</pre>
      <Grid container spacing={5}>
        <Grid item container spacing={1}>
          {addPathsBtn}
        </Grid>
        <Grid item container spacing={1}>
          {showPathsBtn}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
