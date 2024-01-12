import { Transfer } from "@/types/transfer";
import UserCard from "@/components/UserCard/UserCard";
import axios from "axios";
import Image from "next/image";
import styles from "../list.module.css";
type TransferProps = {
  transfer: Transfer;
  refresh: () => void;
  editTransfer: (expenseId: string) => void;
};

export default function TransferRow(props: TransferProps) {
  const handleExpenseDelete = async () => {
    await axios.delete(
      process.env.NEXT_PUBLIC_BASE_URL + "/transfer/" + props.transfer.id
    );
    props.refresh();
  };
  return (
    <tr>
      <td>
        <p className="left">...{props.transfer.id.slice(-4)}</p>
      </td>
      <td className="middle">
        <UserCard user={props.transfer.userFrom} />
      </td>
      <td className={styles.center}>
        <Image
          src="/images/arrow-right.svg"
          alt="arrow-right"
          width={29}
          height={24}
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
        <button onClick={() => props.editTransfer(props.transfer.id)}>
          <Image src="/images/pencil.svg" alt="edit" width="16" height="16" />
        </button>
        <button onClick={handleExpenseDelete}>
          <Image src="/images/trash.svg" alt="delete" width="16" height="16" />
        </button>
      </td>
    </tr>
  );
}
