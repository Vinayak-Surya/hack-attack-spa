import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import {Context as context} from "../../shared/context"
import "./accounts.scss";

export default function Home() {
  const auth = context();
  const [accounts, setAccounts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    auth.getAccounts()
    .then((data:any) => {
      setLoading(false)
      setAccounts(data)
    })
  }, [])
  
  const showBalance = (type:any, balance:any) => {
    if (type === "TravelAccount") {
      return '€'+ (parseFloat(balance) * 1.18)
    } else {
      return '£' + balance
    }
  }

  function AccountAccordion({accounts}:any) {
    return (
      <>
      {accounts.map((item: any, index:any) => {
        return (
          <Accordion>
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{item.subAccountType}</Accordion.Header>
              <Accordion.Body className="margin0">
                <table className="table table-hover margin0">
                  <tbody>
                    <tr>
                      <td scope="row" className="name">
                      <span className="subname">{item.subAccountType === 'Savings' ? "Account No.": "FitPass Credit Card"}</span>
                        <div>{item.accountNumber}</div>
                      </td>
                      <td scope="row" className="name">
                        <span className="subname">{item.subAccountType === 'Savings' ? "Available Balance": "Amount Outstanding"}</span>
                        <div className="balance">{showBalance(item.subAccountType,item.balance)}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )
      })}
    </>)
  }
  return (
    <>
      <h4 className="ml-3 mb-4">Accounts</h4>
      <div className="ml-3">
        {loading && (<div>
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>)}
        <div className="col-md-6">
          <AccountAccordion accounts={accounts} />
        </div>
      </div>
    </>
  );
}
