import { useEffect, useState } from "react";
import {Context as context} from "../../shared/context"
import "./transactions.scss";

export default function Home() {
  const auth = context();
  const [transaction, setTransactions] = useState<any>([]);
  useEffect(() => {
    auth.getAccounts()
      .then((response:any) => {
        response.map((item:any) => {
          auth.listTransactions(item.accountId)
          .then((data:any) => {
            setTransactions(data)
          })
        })  
    })
  }, [])

  return (
    <>
      <h2 className="ml-3 mb-4">Payment History</h2>
      <div className="ml-3">
        <div className="col-md-5">
          <div className="container-box-table">
            <h3 className="subtitle">Payment Transactions</h3>
          </div>
          <table id="table1" className="table table-hover">
          <tbody>
            <tr>
              <th scope="col" className="name">
                #ID
              </th>
              <th scope="col" className="arrow">Date</th>
              <th scope="col" className="arrow">Amount</th>
            </tr>
            {transaction.map((item: any) => {
              const transitData = new Date(item.BookingDateTime)
              return (
                <tr>
                  <td scope="row" className="name">
                    {item.TransactionId}
                  </td>
                  <td scope="row" className="arrow">{`${transitData.getFullYear()}-${transitData.getMonth()}-${transitData.getDate()}`}</td>
                  <td scope="row" className="arrow">{(item.CreditDebitIndicator === 'Credit' ? '+':'-') + '£'+item.Amount.Amount}</td>
                </tr>
              )
            })}
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
