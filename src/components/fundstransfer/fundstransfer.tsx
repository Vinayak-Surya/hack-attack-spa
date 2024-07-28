import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
// import Accordion from 'react-bootstrap/Accordion';
import {Context as context} from "../../shared/context"
import "./fundstransfer.scss";

export default function Home() {
  const auth = context();
  const [accounts, setAccounts] = useState<any>({});
  useEffect(() => {
      auth.getAccounts()
      .then((data:any) => {
        let newData:any = {}
        data.map((item:any) => {
          newData[item.subAccountType] = item
        })
        setAccounts(newData);
      })
  }, [])

  const [transfer, setTransfer] = useState<any>({amount: '', gbpAmount: '', insurance: 0, startDate: ""});
  const [show, setShow] = useState<any>({step1:'display-b', step2: 'display-n', step3: 'display-n'});

  const handleChange = (name:any) => (value:any) => {
    const amount  =  value.target.value || 0
    const gbpAmount = parseInt(amount) * 0.84
    setTransfer((prevState: any) => ({
      ...prevState,
      [name]: value.target.value,
      gbpAmount
    }));
  }

  const handleCheck = (value:any) => () => {
    setTransfer((prevState: any) => ({
      ...prevState,
      insurance: value
    }));
  }

  const handleReview = () => {
    setShow((prevState: any) => ({
      ...prevState,
      step1: 'display-n',
      step2: 'display-b'
    }));
  }

  const handleCancel = () => {
    setShow((prevState: any) => ({
      ...prevState,
      step1: 'display-b',
      step2: 'display-n'
    }));
  }

  const handleConfirm = () => {
    if (accounts['TravelAccount']) {
      const requestData = {
        insurance: transfer.insurance || 0,
        startDate: transfer.startDate
      }
      auth.requestTravelAccount(transfer.amount)
      .then((data:any) => {
        if (data === "Successful") {
          auth.requestTravelInsurance(requestData)
          .then(() => {
            setShow((prevState: any) => ({
              ...prevState,
              step1: 'display-n',
              step2: 'display-n',
              step3: 'display-b'
            }));
          })
        }
      })
    } else {
      const requestData = {
        amount: transfer.amount,
        insurance: transfer.insurance || 0,
        startDate: transfer.startDate
      }
      auth.requestOpenAccount(requestData)
      .then(() => {
        setShow((prevState: any) => ({
          ...prevState,
          step1: 'display-n',
          step2: 'display-n',
          step3: 'display-b'
        }));
      })
    }
  }

  const setDate = (e: any) => {
    setTransfer((prevState: any) => ({
      ...prevState,
      startDate: e.target.value
    }));
  }

  // function AllCollapseExample({index, headerTitle, children}:any) {
  //   return (
  //     <>
  //       <Accordion>
  //         <Accordion.Item eventKey={index}>
  //           <Accordion.Header>{headerTitle}</Accordion.Header>
  //           <Accordion.Body className="margin0">
  //             {children}
  //           </Accordion.Body>
  //         </Accordion.Item>
  //       </Accordion>
  //   </>)
  // }

  const disabled:any = !transfer.amount || (transfer.amount && transfer.insurance && !transfer.startDate) ? 'disabled' : ''

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content">
        <div className="col-md-5 ml-3">
          <div className={show.step1}>
            <div><h2>Travel Account</h2></div>
            <div className="card rounded-3 shadow-sm">
              <div className="box-division">
                <div>From:</div>
                <div className="graycolor">My Current Account</div>
                <div className="float-l">{accounts['Savings'] && accounts['Savings'].accountNumber}</div>
                <div className="float-r"><span className="graycolor">Available Balance:</span> <span className="show-balance">£{accounts['Savings'] && accounts['Savings'].balance}</span></div>
              </div>
              <div className="box-division">
                <div className="mb-1">To:</div>
                <div className="currency">Euro pot</div>
                <div><input className="form-control text-align" value={transfer.amount} onChange={handleChange('amount')} name="amount" placeholder="0" /></div>
              </div>
              <div className="compare">
                <div className="compare-division">
                  <div className="float-l padding-t8"><img width={20} src="https://cdn-icons-png.freepik.com/512/12158/12158778.png?ga=GA1.1.1669094140.1721714955" /> Amount in GBP (£):</div>
                  <div className="float-l"><input className="form-control width10" readOnly value={transfer.gbpAmount} onChange={handleChange('amount')} placeholder="0" /></div>
                  <div className="float-l padding-t8 padding-l8">=</div>
                  <div className="float-l padding-t8"><img width={20} src="https://cdn-icons-png.freepik.com/512/16244/16244294.png?ga=GA1.1.1669094140.1721714955" /> Amount in EUR (€):</div>
                  <div className="float-l"><input className="form-control width10" readOnly value={transfer.amount} onChange={handleChange('amount')} placeholder="0" /></div>
                </div>
              </div>
              <div className="box-division">
                <div className="mb-1 text-body-secondary">Insure Your Travel</div>
                {/* <AllCollapseExample index={"3months"} headerTitle={"3 months"}>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="card-title pricing-card-title">Premium Amount</div>
                      <h5 className="card-title pricing-card-title">£ 40</h5>
                    </div>
                    <div className="col-md-5 border-l">
                      <ul className="ps-0 list">
                        <li><span>Hospitalization expenses for illness and injury</span></li>
                        <li><span>Loss of checked-in baggage</span></li>
                        <li><span>Loss of electronic equipment</span></li>
                      </ul>
                      <div>To know more, <span>click here</span></div>
                    </div>
                  </div>
                </AllCollapseExample> */}
                <div className="accordion accordion-flush" id="travelAccountInsurance">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed header-collapse" onClick={handleCheck(40)} type="button" data-bs-toggle="collapse" data-bs-target="#4months" aria-expanded="false" aria-controls="4months">
                        3 months
                      </button>
                    </h2>
                    <div id="4months" className="accordion-collapse collapse paddingall" data-bs-parent="#travelAccountInsurance">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="card-title pricing-card-title">Premium Amount</div>
                          <h5 className="card-title pricing-card-title">£ 40</h5>
                        </div>
                        <div className="col-md-5 border-l">
                          <ul className="ps-0 list">
                            <li><span>Hospitalization expenses for illness and injury</span></li>
                            <li><span>Loss of checked-in baggage</span></li>
                            <li><span>Loss of electronic equipment</span></li>
                          </ul>
                          <div>To know more, <span>click here</span></div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed header-collapse" onClick={handleCheck(65)} type="button" data-bs-toggle="collapse" data-bs-target="#6months" aria-expanded="false" aria-controls="6months">
                        6 months
                      </button>
                    </h2>
                    <div id="6months" className="accordion-collapse collapse paddingall" data-bs-parent="#travelAccountInsurance">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="card-title pricing-card-title">Premium Amount</div>
                          <h5 className="card-title pricing-card-title">£ 65</h5>
                        </div>
                        <div className="col-md-5 border-l">
                          <ul className="ps-0 list">
                            <li><span>Hospitalization expenses for illness and injury</span></li>
                            <li><span>Loss of checked-in baggage</span></li>
                            <li><span>Loss of electronic equipment</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed header-collapse" onClick={handleCheck(100)} type="button" data-bs-toggle="collapse" data-bs-target="#1year" aria-expanded="false" aria-controls="1year">
                        1 year
                      </button>
                    </h2>
                    <div id="1year" className="accordion-collapse collapse paddingall" data-bs-parent="#travelAccountInsurance">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="card-title pricing-card-title">Premium Amount</div>
                          <h5 className="card-title pricing-card-title">£ 100</h5>
                        </div>
                        <div className="col-md-5 border-l">
                          <ul className="ps-0 list">
                            <li><span>Hospitalization expenses for illness and injury</span></li>
                            <li><span>Loss of checked-in baggage</span></li>
                            <li><span>Loss of electronic equipment</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
                <div className="mt-3">
                  <div>Start Date</div>
                  <Form.Control type="date" value={transfer.startDate} 
                  name="datepic" placeholder="DateRange" 
                  onChange={setDate}
                  />
                </div>
              </div>
              <div className="box-division">
                <button type="button" disabled={disabled} onClick={handleReview} className="w-100 mt-3 btn btn-lg btn-outline-primary">Review Transfer</button>
              </div>
            </div>
          </div>
          <div className={show.step2}>
            <div><h2>Check and confirm</h2></div>
            <div className="card rounded-3 shadow-sm">
              <div>
                <div>
                  <div className="box-division">
                    <div>From:</div>
                    <div className="graycolor">My Current Account</div>
                    <div className="float-l">{accounts['Savings'] && accounts['Savings'].accountNumber}</div>
                    <div className="float-r"><span className="graycolor">Available Balance:</span> <span className="show-balance">£{accounts['Savings'] && accounts['Savings'].balance}</span></div>
                    <div className="clear"></div>
                  </div>
                  <div className="box-division">
                    <div className="mb-1">To</div>
                    <div>Euro pot</div>
                  </div>
                  <div className="box-division">
                    <div className="mb-1">Amount</div>
                    <div>£{transfer.gbpAmount} = €{transfer.amount}</div>
                  </div>
                  {transfer.insurance ? (<div className="box-division">
                    <div className="mb-1">Travel insurance charges</div>
                    <div>€{transfer.insurance}</div>
                  </div>) : ''}
                </div>
                <div className="box-division">
                  <button type="button" onClick={handleConfirm} className="w-100 mt-3 btn btn-lg btn-outline-primary">Confirm</button>
                  <button type="button" onClick={handleCancel} className="w-100 mt-3 btn btn-lg btn-outline-primary">Cancel</button>
                </div>
            </div>
          </div>
          </div>
          <div className={show.step3}>
            <div><h2>Confirmation</h2></div>
            <div className="card rounded-3 shadow-sm">
              <div>
                <div>
                  <div className="box-division mt-3">
                    <div className="text-center"><img width={100} src="https://cdn-icons-png.freepik.com/512/12503/12503852.png?ga=GA1.1.1669094140.1721714955" /></div>
                    <div className="text-center font-b">Transfer complete</div>
                  </div>
                </div>
                <div className="box-division">
                  <Link className="link-view" to="/transactions">View Transactions</Link>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
