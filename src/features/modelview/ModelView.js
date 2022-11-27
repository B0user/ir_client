import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import { useQuery } from "@tanstack/react-query";
import "@google/model-viewer/dist/model-viewer";
import { RWebShare } from "react-web-share";
import { useEffect, useState } from "react";
// Custom
// import Filters from "./Filters";
// import SearchBar from "./SearchBar";
// import CatalogSwiper from "./CatalogSwiper";
import { API_URL } from "../../config";
import QRCode from "../qrcodes/QRCode";
import axios from "../../api/axios";
import "../../mv.css";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import TutorialSwiper from "../tutorial/TutorialSwiper";
import Popup from "../popup/Popup";

const fetchModelInfo = (product_id) => {
  return axios.get(`/mv/models/${product_id}`);
};

const fetchBrandProducts = (client_id) => {
  return axios.get(`/mv/products/${client_id}`);
};

const ModelView = () => {
  const navigate = useNavigate();
  // URL data
  const { client_id, product_id } = useParams();
  const [searchParams] = useSearchParams();
  const sizeQuery = searchParams?.get("size");
  const [searchResults, setSearchResults] = useState();
  // Settings
  const [size, setSize] = useState();
  // Model Info
  const [found, setFound] = useState();

  // Tutorial
  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialPopupActive, setTutorialPopupActive] = useState(false);

  // Get all Products with models
  const { isError: isProductsFetchError, data: products } = useQuery(
    ["products-by-client", client_id],
    () => fetchBrandProducts(client_id),
    {
      select: (data) => {
        const withModels = data.data.filter((prod) => !!prod.models.length);
        return withModels;
      },
      onSuccess: (data) => setSearchResults(data),
    }
  );
  // Fetching all models for product
  const {
    isLoading,
    isError,
    isSuccess,
    data: variations,
  } = useQuery(["variations", product_id], () => fetchModelInfo(product_id), {
    onSuccess: (models) => chooseModel(models, sizeQuery),
  });

  useEffect(() => {
    if (localStorage.getItem("no-tutorial") !== "true")
      setTutorialPopupActive(true);
  }, []);
  useEffect(() => {
    if (variations) chooseModel(variations, sizeQuery);
  }, [sizeQuery, variations]);

  function chooseModel(models, sizeVar) {
    if (sizeVar) {
      const model = models.data?.find((m) => m.size === sizeVar);
      if (model) {
        setSize(sizeVar);
        setFound(model);
      } else {
        setSize(models.data[0]?.size);
        setFound(models.data[0]);
      }
    } else {
      setSize(models.data[0]?.size);
      setFound(models.data[0]);
    }
  }

  const handleSizeChanged = (e) => {
    var size = e.target.value;
    navigate(`?size=${size}`);
    searchParams.set("size", size);
  };

  // const requestARAccess = () => {
  //   navigator.getUserMedia(
  //     { augmentedReality: true },
  //     function (stream) {
  //       stream.getTracks().forEach((x) => x.stop());
  //     },
  //     (err) => console.log(err)
  //   );
  // };

  if (isProductsFetchError)
    return (
      <p>
        Бренд не найден, ваш URL был изменен <Link to={-1}>Вернуться</Link>
      </p>
    );
  if (isLoading) return <span className="spinner-border" />;
  if (isError) return <p>Модель не найдена, ваш URL был изменен</p>;
  if (isSuccess) {
    const linkToProduct = found
      ? products?.filter((prod) => prod._id === found.product_id)[0].link
      : null;
    if (!variations) console.log("wrong URL");
    else
      return (
        <>
          <MobileView className="h-100">
            <TutorialSwiper
              active={tutorialActive}
              setActive={setTutorialActive}
            />
            <model-viewer
              src={API_URL + found?.model_path}
              alt="Carpet model"
              ar-modes="webxr quick-look"
              ar
              ar-scale="fixed"
              environment-image="neutral"
              auto-rotate
              camera-controls
              camera-orbit="90deg 50deg 2m"
              class={tutorialActive ? "d-none" : ""}
            >
              <nav className="navbar">
                <div className="container-fluid d-flex justify-content-between">
                  <RWebShare
                    data={{
                      title: "BritishAsia Home",
                      text: "Выбирайте ковер не выходя из дома",
                      url: window.location.href,
                    }}
                  >
                    <svg
                      className="share"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z" />
                    </svg>
                  </RWebShare>
                  <a
                    className="btn rounded-pill btn-primary w-75 text-white"
                    href={linkToProduct}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Подробнее
                  </a>
                  <FontAwesomeIcon
                    icon={faQuestion}
                    onClick={() => setTutorialPopupActive(true)}
                  />
                </div>
                <div className="container-fluid justify-content-center d-flex">
                  <select
                    className="form-select w-50 mt-2"
                    onChange={handleSizeChanged}
                    value={sizeQuery}
                  >
                    {variations.data?.map(
                      (model, i) =>
                        model.active && (
                          <option key={i} value={model.size}>
                            {model.size}
                          </option>
                        )
                    )}
                  </select>
                </div>
              </nav>
              <button
                slot="ar-button"
                id="ar-button"
              >
                Посмотреть у себя
              </button>
              <div className="container-fluid fixed-bottom pt-2 px-0 d-flex justify-content-center align-items-center flex-column">
                <button
                  className="btn btn-primary rounded-0 rounded-top"
                  onClick={() => navigate(`/modelview/${client_id}`)}
                >
                  Другой продукт
                </button>
              </div>
              <Popup
                active={tutorialPopupActive}
                setActive={setTutorialPopupActive}
              >
                <div className="tutorial-popup mx-2">
                  <p>Хотите пройти быстрое обучение?</p>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        setTutorialPopupActive(false);
                        setTutorialActive(true);
                      }}
                    >
                      Да
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => setTutorialPopupActive(false)}
                    >
                      Нет
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setTutorialPopupActive(false);
                        localStorage.setItem("no-tutorial", "true");
                      }}
                    >
                      Никогда
                    </button>
                  </div>
                </div>
              </Popup>
            </model-viewer>
          </MobileView>
          <BrowserView className="text-center">
            <h1>Пожалуйста, используйте QR код</h1>
            <p>Наведите камеру на QR код, чтобы открыть примерочную.</p>
            <QRCode
              url={window.location.href}
              isImage={true}
              isButton={false}
            />
            <p>
              Создано <Link to="/">INROOM.TECH</Link>&copy;
            </p>
          </BrowserView>
        </>
      );
  }
};

export default ModelView;
