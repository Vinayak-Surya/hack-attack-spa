import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import {Context as context} from "../../shared/context"
import "./accounts.scss";

export default function Home() {
  const auth = context();
  const [accounts, setAccounts] = useState<any>([]);
  useEffect(() => {
      auth.getAccounts()
      .then((data:any) => {
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

  function AllCollapseExample({accounts}:any) {
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
                      <span className="subname">Account No.</span>
                        <div>{item.accountNumber}</div>
                      </td>
                      <td scope="row" className="name">
                        <span className="subname">Available Balance</span>
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
      <h2 className="ml-3 mb-4">Accounts</h2>
      <div className="ml-3">
        <div className="col-md-6">
          <AllCollapseExample accounts={accounts} />
        </div>
      </div>
    </>
  );
}
