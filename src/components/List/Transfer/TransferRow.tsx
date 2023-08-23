import { Transfer } from "@/types/transfer";
import UserCard from "../../UserCard";

type TransferProps = {
  transfer: Transfer;
  refresh: () => void;
};
export default function TransferRow(props: TransferProps) {
  return (
    <tr>
      <td>
        <p className="left">...{props.transfer.id.slice(-4)}</p>
      </td>
      <td className="middle">
        <UserCard user={props.transfer.userFrom} />
      </td>
      <td className="min-width">
        <img
          src="/images/arrow-right.svg"
          alt="arrow-right"
        />
      </td>
      <td className="middle">
        <UserCard user={props.transfer.userTo} />
      </td>
      <td>
        <p className="middle"> {props.transfer.date} </p>
      </td>
      <td>
        <p className="right bold"> {props.transfer.amount} Ft</p>
      </td>
      <td className="min-width right">
        <a href="/edit_expense/<%= cur._id %>">
          <img src="/images/pencil.svg" className="hideondark" alt="edit" />
          <img
            src="/images/pencil-white.svg"
            className="hideonlight"
            alt="edit"
          />
        </a>
        <a href="/delete_expense/<%= cur._id %>">
          <img src="/images/trash.svg" className="hideondark" alt="delete" />
          <img
            src="/images/trash-white.svg"
            className="hideonlight"
            alt="delete"
          />
        </a>
      </td>
    </tr>
  );
}
