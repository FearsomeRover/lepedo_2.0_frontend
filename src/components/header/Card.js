import '../../App.css'
import './card.css'
export default function Card({color, title, value, bottomLink}) {
  return (
      <div className={"card bg-" + color}>
        <h5>{title}</h5>
        <h2>{value}</h2>
        {bottomLink && (
          <button onClick={bottomLink.action}>{bottomLink.name}</button>
        )}
      </div>
  );
}
