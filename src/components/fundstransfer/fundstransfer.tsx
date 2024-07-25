import { useEffect, useState } from "react";
import {Context as context} from "../../shared/context"
import "./fundstransfer.scss";

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

  return (
    <>
      <h2 className="ml-3 mb-4">Funds Transfer</h2>
      <div className="ml-2 row">
        <div className="col-md-5">
          <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3"><h4 className="my-0 fw-normal">Health Shield 360 Top-Up</h4></div>
              <div className="card-body row">
                <div className="col-md-5">
                  <div className="mb-1 text-body-secondary">Premium Amount</div>
                  <div>starting from</div>
                  <h5 className="card-title pricing-card-title">£ 08</h5>
                  <div>per day</div>
                </div>
                <div className="col-md-5">
                  <ul>
                    <li>cover up to 30 Lakhs</li>
                    <li>No pre policy Medical</li>
                  </ul>
                </div>
                <button type="button" className="w-100 mt-3 btn btn-lg btn-outline-primary">Buy Now</button>
              </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3"><h4 className="my-0 fw-normal">Travel Insurance</h4></div>
              <div className="card-body row">
                <div className="col-md-5">
                  <div className="mb-1 text-body-secondary">Premium Amount</div>
                  <div>starting from</div>
                  <h5 className="card-title pricing-card-title">£ 49</h5>
                  <div>per day</div>
                </div>
                <div className="col-md-5">
                  <ul>
                    <li>hospitalization expanses for illness and injury</li>
                    <li>Loss of electronic equipment pre policy Medical</li>
                  </ul>
                </div>
                <button type="button" className="w-100 mt-3 btn btn-lg btn-outline-primary">Buy Now</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
