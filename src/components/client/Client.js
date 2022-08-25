import { Link } from "react-router-dom";

const Client = () => {
  return ( 
    <>
      <h1>Client Panel</h1>
      <br />
      <Link to="products">All Products</Link>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </>
  )
}

export default Client