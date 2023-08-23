"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import styles from "../list.module.css";
type TransferFormProps = {
  abort: () => void;
  refresh: () => void;
};
type Response = {
  data: User[];
};
export default function NewTransferForm(props: TransferFormProps) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [users, setUsers] = useState<User[] | null>();
  const getAllUsers = async () => {
    const response: Response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/user"
    );
    setUsers(response.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name") ?? "";
    const amountValue: FormDataEntryValue | null = formData.get("amount");
    let amount = 0;
    if (amountValue !== null && typeof amountValue === "string") {
      const intValue: number = parseInt(amountValue);
      if (!isNaN(intValue)) {
        amount = intValue;
      }
    }
    const data = {
      userFromId: formData.get("payed"),
      amount,
      userToId: formData.get("payedto"),
      date: formData.get("date"),
    };
    console.log(data);
    await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/transfer", data);
    props.abort();
    props.refresh();
  };
  const validateDate = (event: any) => {
    if (new Date(event.target.value) > new Date()) {
      (event.target as HTMLInputElement).setCustomValidity("Really bro?");
    }
  };
  return (
    <div className={styles.popup}>
      {users ? (
        <form onSubmit={handleFormSubmit} className={styles.expenseform}>
          <input
            placeholder="Összeg"
            name="amount"
            type="number"
            min={50}
            max={1_000_000}
            required
            //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Csak 50Ft és 1000000Ft közti érték lehet")}
          />
          <input
            placeholder="Dátum"
            name="date"
            type="date"
            defaultValue={currentDate}
            onChange={validateDate}
            onInvalid={(e) =>
              (e.target as HTMLInputElement).setCustomValidity(
                "Csak 50Ft és 1000000Ft közti érték lehet"
              )
            }
          />

          <div className={styles.userares}>
            <div className={styles.payed}>
              <h5 className={styles.usertitle}>Utaló</h5>
              {users.map((user) => (
                <label className={styles.radiolabel} key={user.id}>
                  <input
                    type="radio"
                    id={user.id}
                    value={user.id}
                    className="radio"
                    name="payed"
                    //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('És akkor ezt most kinek írjam be?')}
                  />
                  <UserCard user={user} key={user.id} />
                </label>
              ))}
            </div>
            <img
              className={styles.arrow}
              src="/images/arrow-right.svg"
              alt="arrow-right"
            ></img>
            <div className={styles.payedto}>
              <h5 className={styles.usertitle}>Kedvezményezett</h5>
              {users.map((user) => (
                <label className={styles.checklabel} key={user.id}>
                  <UserCard user={user} key={user.id} />
                  <input
                    type="radio"
                    id={user.id}
                    value={user.id}
                    className="radio"
                    name="payedto"
                    //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('És akkor ezt most kinek írjam be?')}
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <input className="sbtn_with_h4" type="submit" value="Mentés" />
            <button
              className="sbtn"
              onClick={() => {
                props.abort();
              }}
            >
              <h4>Mégse</h4>
            </button>
          </div>
        </form>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
