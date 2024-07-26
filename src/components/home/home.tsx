// import { useEffect, useState } from "react";
// import {Context as context} from "../../shared/context"
import { Link } from "react-router-dom";

import "./home.scss";

export default function Home() {
  // const auth = context();
  // const [accounts, setAccounts] = useState<any>([]);
  // useEffect(() => {
  //   auth.getAccounts()
  //   .then((data:any) => {
  //     if (data.Data.Account[1].AccountSubType === "Savings") {
  //       auth.getAccountBalance(data.Data.Account[1].AccountId)
  //       .then((data:any) => {
  //         setAccounts(data.Data.Balance)
  //       })
  //     }
  //   })
  // }, [])

  // const sum = accounts.reduce((accumulator: any, currentValue:any ) => {
  //   return accumulator + parseInt(currentValue.Amount.Amount)
  // },0);

  return (
    <>
    <h2 className="ml-3 mb-4">Dashboard</h2>
    <div className="ml-3">
      {/* <div className="col-md-3">
        <div className="row g-0 border bgwhite rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="row g-0">
            <div>
              <strong className="d-inline-block mb-2 text-primary-emphasis">Account Balance ({accounts.length} Account)</strong>
              <div className="mb-1 text-body-secondary border-bottom">£{sum}</div>
              {accounts.map((item: any) => {
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
      <div className="mb-2"><h5>Recently Used</h5></div> */}
      <div className="row align-items-md-stretch">
        <div className="col-md-2">
          <Link to="/accounts" className="row pointer-cursor g-0 border bgwhite rounded h-140 mb-4 shadow-sm align-center">
            <div><img width={70} src="https://cdn-icons-png.freepik.com/512/16069/16069655.png" /></div>
            <div aria-label="accounts & info" className="mt-3 link">Accounts & Info</div>
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="/transactions" className="row pointer-cursor g-0 border bgwhite rounded h-140 mb-4 shadow-sm align-center">
            <div><img width={70} src="https://cdn-icons-png.freepik.com/512/9452/9452687.png?ga=GA1.1.1669094140.1721714955" /></div>
            <div aria-label="payment history" className="mt-3 link">Payment History</div>
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="/fundstransfer" className="row pointer-cursor g-0 border bgwhite rounded h-140 mb-4 shadow-sm align-center">
            <div><img width={70} src="https://cdn-icons-png.freepik.com/512/16933/16933151.png?ga=GA1.1.1669094140.1721714955" /></div>
            <div aria-label="funds transfer" className="mt-3 link">Funds Transfer</div>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}
