import '../../App.css'
export default function Card({color, title, value, bottomLink}) {
  return (
      <div className={"card bg-" + color}>
        <h5>{title}</h5>
        <h2>{value}</h2>
        {bottomLink && (
          <a href={bottomLink.ref}>{bottomLink.name}</a>
        )}
      </div>
  );
}
