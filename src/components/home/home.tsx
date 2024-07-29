import { Link } from "react-router-dom";
import "./home.scss";

export default function Home() {

  return (
    <>
    <h2 className="ml-3 mb-4">Dashboard</h2>
    <div className="container">
         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content">
        <div className="col-md-2">
          <Link to="/accounts" className="row pointer-cursor g-0 border bgwhite rounded h-140 mb-4 shadow-sm align-center">
            <div><img width={70} src="https://cdn-icons-png.freepik.com/512/8870/8870467.png?ga=GA1.1.1669094140.1721714955" /></div>
            <div aria-label="accounts & info" className="mt-3 link">Accounts & Info</div>
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="/transactions" className="row pointer-cursor g-0 border bgwhite rounded h-140 mb-4 shadow-sm align-center">
            <div><img width={70} src="https://cdn-icons-png.freepik.com/512/17289/17289132.png?ga=GA1.1.1669094140.1721714955" /></div>
            <div aria-label="payment history" className="mt-3 link">Payment History</div>
          </Link>
        </div>
        <div className="col-md-2">
          <Link to="#" className="row pointer-cursor g-0 border bgwhite rounded h-140 mb-4 shadow-sm align-center">
            <div><img width={70} src="https://cdn-icons-png.freepik.com/512/16933/16933151.png?ga=GA1.1.1669094140.1721714955" /></div>
            <div aria-label="funds transfer" className="mt-3 link">Funds Transfer</div>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}
