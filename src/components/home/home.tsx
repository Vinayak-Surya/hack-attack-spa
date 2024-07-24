import { useEffect, useState } from "react";
import {Context as context} from "../../shared/context"

import "./home.scss";

export default function Home() {
  const auth = context();
  const [accounts, setAccounts] = useState([
    {
        "AccountId": "0b132b62-fb20-4870-a1d1-1e15f909124d",
        "CreditDebitIndicator": "Credit",
        "Type": "Expected",
        "DateTime": "2024-07-22T05:08:20.780Z",
        "Amount": {
            "Amount": "19619.77",
            "Currency": "GBP"
        }
    },
    {
        "AccountId": "0b132b62-fb20-4870-a1d1-1e15f909124d",
        "CreditDebitIndicator": "Credit",
        "Type": "ForwardAvailable",
        "DateTime": "2024-07-22T05:08:20.780Z",
        "Amount": {
            "Amount": "19619.77",
            "Currency": "GBP"
        }
    }
]);
  // useEffect(() => {
  //   auth.getAccounts()
  //   .then((data:any) => {
  //     setAccounts(data.Data.Balance)
  //   })
  // }, [])

  const sum = accounts.reduce((accumulator: any, currentValue:any ) => {
    return accumulator + parseInt(currentValue.Amount.Amount)
  },0);

  return (
    <>
    <h2 className="ml-3 mb-4">Dashboard</h2>
    <div className="ml-3">
      <div className="col-md-3">
        <div className="row g-0 border bgwhite rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="row g-0">
            <div>
              <strong className="d-inline-block mb-2 text-primary-emphasis">Account Balance ({accounts.length} Account)</strong>
              <div className="mb-1 text-body-secondary border-bottom">£{sum}</div>
              {accounts.map((item) => {
                return (<div className="card-body text-container">
                  <div>{item.AccountId}</div>
                  <div>£{item.Amount.Amount}</div>
                </div>)
              })}
              <a className="icon-link mt-2 gap-1 icon-link-hover stretched-link">View</a>
            </div>
          </div>
        </div>
      </div>
    <div className="col-md-5">
      <div className="container-box-table">
        <h3 className="subtitle">Recent Transactions</h3>
      </div>
      <table id="table1" className="table table-hover">
      <tbody>
        <tr>
          <td scope="row" className="name">
            Transfer1
          </td>
          <td scope="row" className="arrow">80.00</td>
        </tr>
        <tr>
          <td scope="row" className="name">
            Transfer2
          </td>
          <td scope="row" className="arrow">180.00</td>
        </tr>
      </tbody>
      </table>
      </div>
      <div className="mb-2"><h5>Recently Used</h5></div>
      <div className="row align-items-md-stretch">
        <div className="col-md-1">
          <div className="row g-0 border bgwhite rounded mb-4 shadow-sm align-center">
            <div><img width={50} src="https://cdn-icons-png.freepik.com/512/16069/16069655.png" /></div>
            <div aria-label="accounts">Accounts</div>
          </div>
        </div>
        <div className="col-md-1">
          <div className="row g-0 border bgwhite rounded mb-4 shadow-sm align-center">
            <div><img width={50} src="https://cdn-icons-png.freepik.com/512/12885/12885475.png" /></div>
            <div aria-label="services">Services</div>
          </div>
        </div>
        <div className="col-md-1">
          <div className="row g-0 border bgwhite rounded mb-4 shadow-sm align-center">
            <div><img width={50} src="https://cdn-icons-png.freepik.com/512/11936/11936854.png" /></div>
            <div aria-label="loans">Loans</div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
