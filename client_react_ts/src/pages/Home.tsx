import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";


const Home = () => {
  const user: any = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1> Home </h1>
      <pre>authenticated: {user.authenticated ? "true" : "false"}</pre>
      <Link to="/recibo/venta">Venta Recibo</Link>
      <Link to="/add/item">Agregar Item</Link>
      <Link to="/show/items">Ver Item</Link>
    </div>
  );
};

export default Home;
