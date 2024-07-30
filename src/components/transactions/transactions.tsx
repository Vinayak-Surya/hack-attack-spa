import { useEffect, useState } from "react";
import {Context as context} from "../../shared/context"
import "./transactions.scss";

export default function Home() {
  const auth = context();
  const [transaction, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    auth.getAccounts()
      .then((response:any) => {
        return response.map((item:any) => {
          auth.listTransactions(item.accountId)
          .then((data:any) => {
            setLoading(false)
            if (data) {
              setTransactions(data)
            }
          })
        })  
    })
  }, [])

  function dateToYMD(date:any) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

  return (
    <>
      <h4 className="ml-3 mb-4">Payment History</h4>
      <div className="ml-3">
        <div className="col-md-5">
          <div className="container-box-table">
            <h3 className="subtitle">Payment Transactions</h3>
          </div>
          <table id="table1" className="table table-hover">
          <tbody>
            <tr>
              <th scope="col" className="name">
                Description
              </th>
              <th scope="col" className="arrow">Date</th>
              <th scope="col" className="arrow">Amount</th>
            </tr>
            {transaction.map((item: any) => {
              const transitData = dateToYMD(new Date(item.BookingDateTime))
              return (
                <tr>
                  <td scope="row" className="name">
                    {item.TransactionInformation ? item.TransactionInformation: '-'}
                  </td>
                  <td scope="row" className="arrow">{transitData}</td>
                  <td scope="row" className="arrow">{(item.CreditDebitIndicator === 'Credit' ? '+':'-') + '£'+item.Amount.Amount}</td>
                </tr>
              )
            })}
            {loading && (<tr>
              <td colSpan={3}>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>)}
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
