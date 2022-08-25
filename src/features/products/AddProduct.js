import { useRef, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

const ADDPRODUCT_URL = '/products';

const AddProduct = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [category, setCategory] = useState("carpet");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, description, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        ADDPRODUCT_URL,
        JSON.stringify({ category, name, description, price })
      );
      setSuccess(true);
      //clear state and controlled inputs
      setCategory("");
      setName("");
      setDescription("");
      setPrice("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Addition Failed");
      }
      errRef.current.focus();
    }
  };
  
  return (
    <>
      {success 
      ? navigate('/client/products', {replace: true }) 
      : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Add new Product</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="cat" className="form-label" >Category:</label>
            <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
              <option value="carpet">Carpet</option>
              <option value="sofa">Sofa</option>
              <option value="chair">Chair</option>
            </select>

            <label htmlFor="name" className="form-label">Name of the product:</label>
            <input
              type="text"
              id="name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              required
            />

            <label htmlFor="description" className="form-label">Description:</label>
            <textarea 
              className="form-control" 
              rows="5" id="description" name="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />

            <label htmlFor="price" className="form-label">Price:</label>
            <input
              type="number"
              id="price"
              onChange={(e) => setPrice(e.target.value.toString())}
              value={price}
              className="form-control"
              required
            />
            <br />
            <button className="btn btn-danger">Add</button>
          </form>
          <p>
            <span className="line">
              <Link to="/client/products">Cancel</Link>
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default AddProduct;
