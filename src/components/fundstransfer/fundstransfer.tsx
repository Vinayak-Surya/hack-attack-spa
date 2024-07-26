import { useState } from "react";
import "./fundstransfer.scss";

export default function Home() {
  const [transfer, setTransfer] = useState<any>({currency:'GBP', amount: 0});

  const handleChange = (name:any) => (value:any) => {
    setTransfer({[name]: value.target.value})
  }

  const handleSubmit = () => {

  }

  return (
    <>
      <div className="ml-2 row">
        <div className="col-md-6 ml-3">
          <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3"><h4 className="my-0 fw-normal">Funds Transfer</h4></div>
              <div className="card-body row">
                <div className="col-md-5">
                  <div className="mb-1 text-body-secondary">Amount Balance</div>
                  <h5 className="card-title pricing-card-title">£ 49</h5>
                  <div className="mt-3">
                    <select name="currency" onChange={handleChange('currency')} className="form-select">
                      <option selected={transfer.currency === 'GBP'}>GBP</option>
                      <option selected={transfer.currency === 'USD'}>USD</option>
                    </select>
                  </div>
                  <div className="mt-3 currency-container">
                    <label htmlFor="amount">You Transfer</label>
                    <input className="form-control" value={transfer.amount} onChange={handleChange('amount')} id="amount" name="amount" placeholder="0" />
                    <div className="currency">{transfer.currency}</div>
                  </div>
                </div>
                <div className="col-md-5">
                  <ul>
                    <li>A travel account combines all of your travel expenses from travel agencies and other travel suppliers onto a single invoice. Fewer invoices mean easier administration, total control and better basis for keeping track of costs</li>
                  </ul>
                </div>
                <button type="button" onClick={handleSubmit} className="w-100 mt-3 btn btn-lg btn-outline-primary">Ensure Now</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
