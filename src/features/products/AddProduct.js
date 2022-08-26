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
          <h1>Добавить новый товар</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="cat" className="form-label" >Категория:</label>
            <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
              <option value="carpet">Ковры</option>
              <option value="sofa">Диваны</option>
              <option value="chair">Стулья</option>
            </select>

            <label htmlFor="name" className="form-label">Наименование:</label>
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

            <label htmlFor="description" className="form-label">Описание:</label>
            <textarea 
              className="form-control" 
              rows="5" id="description" name="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />

            <label htmlFor="price" className="form-label">Цена:</label>
            <input
              type="number"
              id="price"
              onChange={(e) => setPrice(e.target.value.toString())}
              value={price}
              className="form-control"
              required
            />
            <br />
            <button className="btn btn-danger">Добавить</button>
          </form>
          <p>
            <span className="line">
              <Link to="/client/products">Отмена</Link>
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default AddProduct;
