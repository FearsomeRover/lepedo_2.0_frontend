import UserCard from "../../UserCard";

export default function TransferRow({transfer}){
    return(<tr>
        <td>
          <p className="left">
            {transfer.title}
          </p>
        </td>
        <td className="middle">
            <UserCard user={transfer.userfrom}/>
        </td>
        <td className="min-width">
          <img
            className="arrow-right hideondark"
            src="/images/arrow-right.svg"
            alt="arrow-right"
          />
          <img
            className="arrow-right hideonlight"
            src="/images/arrow-right-white.svg"
            alt="arrow-right"
          />
        </td>
        <td className="middle">
          <UserCard user={transfer.userto}/>
        </td>
        <td>
          <p className="right bold"> 123 Ft</p>
        </td>
        <td className="min-width right">
          <a href="/edit_expense/<%= cur._id %>">
            <img
              src="/images/pencil.svg"
              className="hideondark"
              alt="edit"
            />
            <img
              src="/images/pencil-white.svg"
              className="hideonlight"
              alt="edit"
            />
          </a>
          <a href="/delete_expense/<%= cur._id %>">
            <img
              src="/images/trash.svg"
              className="hideondark"
              alt="delete"
            />
            <img
              src="/images/trash-white.svg"
              className="hideonlight"
              alt="delete"
            />
          </a>
        </td>
      </tr>)
}
