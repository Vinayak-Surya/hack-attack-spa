import { useEffect, useState } from "react";
import {Context as context} from "../../shared/context"
import "./accounts.scss";

export default function Home() {
  const auth = context();
  const [accounts, setAccounts] = useState<any>([]);
  useEffect(() => {
      auth.getAccounts()
      .then((data:any) => {
        if (data.Data.Account[1].AccountSubType === "Savings") {
          auth.getAccountBalance(data.Data.Account[1].AccountId)
          .then((data:any) => {
            setAccounts(data.Data.Balance)
          })
        }
      })
  }, [])

  const sum = accounts.reduce((accumulator: any, currentValue:any ) => {
    return accumulator + parseInt(currentValue.Amount.Amount)
  },0);

  return (
    <>
      <h2 className="ml-3 mb-4">Accounts</h2>
      <div className="ml-3">
        <div className="col-md-3">
          <div className="row g-0 border bgwhite rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="row g-0">
              <div>
                <strong className="d-inline-block mb-2 text-primary-emphasis">Account Balance ({accounts.length} Accounts)</strong>
                <div className="mb-1 text-body-secondary border-bottom">£{sum}</div>
                {accounts.map((item: any) => {
                  return (<div className="card-body text-container">
                    <div>{item.AccountId}</div>
                    <div>£{item.Amount.Amount}</div>
                  </div>)
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
