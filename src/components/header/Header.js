import './header.css'
import { Link } from 'react-router-dom';
export default function Header({onSumClick, onListClick}) {
  return (
    <div>
      <h1>Lepedő</h1>
      <Link to="/">
        <h2>Összegzés</h2>
      </Link>
      <Link to="/list">
        <h2>Tételek</h2>
      </Link>
    </div>
  );
}
