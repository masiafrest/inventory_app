import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

import { Button } from '@material-ui/core'


const Home = () => {
  const user: any = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {user.authenticated ? "true" : "false"}</pre>
      <Button variant='contained'>
        <Link to="/show/items">Ver Item</Link>
      </Button>
      <Button variant='contained'>
        <Link to="/add/item">Agregar Item</Link>
      </Button>
      <Button variant='contained'>
        <Link to="/recibo/transferencia">Transferencia Recibo</Link>
      </Button>
      <Button variant='contained'>
        <Link to="/recibo/venta">Venta Recibo</Link>
      </Button>
    </div>
  );
};

export default Home;
