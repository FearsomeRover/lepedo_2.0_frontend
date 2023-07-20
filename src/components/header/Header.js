import './header.css'
export default function Header({onSumClick, onListClick}) {
  return (
    <div>
      <h1>Lepedő</h1>
      <button onClick={onSumClick}>
        <h2>Összegzés</h2>
      </button>
      <button onClick={onListClick}>
        <h2>Tételek</h2>
      </button>
    </div>
  );
}
