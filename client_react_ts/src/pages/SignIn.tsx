import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/userActions";

interface IUserInput {
  nombre: string;
  password: string;
}

function SignIn(props: any) {
  const initialValue: IUserInput = { nombre: "", password: "" };
  const [userData, setUserData] = useState(initialValue);
  const [errors, setErrors] = useState({
    nombre: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    setLoading(props.UI.loading);
  }, [props.UI]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit: ", e);
    props.signInUser(userData, props.history);
  };

  const handleChange = (e: any) => {
    setUserData((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">SignIn</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          id="nombre"
          name="nombre"
          type="nombre"
          label="Nombre"
          value={userData.nombre}
          onChange={handleChange}
          fullWidth
          helperText={errors.nombre}
          error={errors.nombre ? true : false}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          helperText={errors.password}
          error={errors.password ? true : false}
        />
        {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          SignIn
          {loading && <CircularProgress size={30} />}
        </Button>
        <br></br>
        {/* <span>
            no tienes cuenta? registrate <Link to="/signup">aqui</Link>
          </span> */}
      </form>
    </Container>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  signInUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SignIn);
