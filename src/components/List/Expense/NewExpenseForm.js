import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../../UserCard";
export default function NewExpenseForm(props) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [users, setUsers] = useState();
  const [shortName, setShortName] = useState(false);
  const [littleAmount, setLittleAmount] = useState(false);
  const getAllUsers = async () => {
    const response = await axios.get(process.env.REACT_APP_BASE_URL + "/user");
    setUsers(response.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const amount = parseInt(formData.get("amount"));
    if (name.length === 0) {
      setShortName(true);
      return;
    }
    if (amount < 100) {
      setLittleAmount(true);
      return;
    }
    const data = {
        title:name,
        payerId:formData.get("payed"),
        amount,
        received:formData.getAll("payedto")
        
    }
    console.log(data);
    await axios.post(process.env.REACT_APP_BASE_URL + "/expense",data);
    props.abort();
    props.refresh();
  };
  return (
    <div className="popup">
      {users ? (
        <form onSubmit={handleFormSubmit} className="expenseform">
          <input
            placeholder="Megnevezés"
            name="name"
            minLength="3"
            maxLength="15"
            onChange={() => setShortName(false)}
          />
          {shortName && <p className="tagerror">Nem lehet üres!</p>}
          <input
            placeholder="Dátum"
            name="date"
            type="date"
            defaultValue={currentDate}
          />
            <input
              placeholder="Összeg"
              name="amount"
              type="number"
              min="0"
              max="10000000"
              onChange={() => setLittleAmount(false)}
            />

          {littleAmount && (
            <p className="tagerror">Ne írjunk má minden kis szart bele pls!</p>
          )}
          <div className="userarea">
            <div className="payed">
              <h5 className="user-title">Fizetett</h5>
              {users.map((user) => (
                <label className="radiolabel">
                  <input
                    type="radio"
                    id={user.id}
                    value={user.id}
                    className="radio"
                    name="payed"
                  />
                  <UserCard user={user} key={user.id} />
                </label>
              ))}
            </div>
            <img
              className="arrow"
              src="/images/arrow-right.svg"
              alt="arrow-right"
            ></img>
            <div className="payedto">
              <h5 className="user-title">Részvett</h5>
              {users.map((user) => (
                <label className="checklabel">
                  <UserCard user={user} key={user.id} />
                  <input
                    type="checkbox"
                    value={user.id}
                    className="radio"
                    name="payedto"
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <input className="sbtn_with_h4" type="submit" value="Mentés" />
            {!props.disabled && (
              <button
                className="sbtn"
                onClick={() => {
                  props.abort();
                }}
              >
                <h4>Mégse</h4>
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
