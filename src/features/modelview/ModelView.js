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
import { useEffect, useState, useReducer, useRef } from "react";
// Custom
// import Filters from "./Filters";
// import SearchBar from "./SearchBar";
// import CatalogSwiper from "./CatalogSwiper";
import { API_URL } from "../../config";
import QRCode from "../qrcodes/QRCode";
import axios from "../../api/axios";
import "./mv.css";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  HowToUseHelp,
  NoButtonHelp,
  DissapearingButtonHelp,
} from "../tutorial/TutorialSwiper";
import Popup from "../popup/Popup";
import { FormGroup, FormControl, TextField, Button } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const fetchModelInfo = (product_id) => {
  return axios.get(`/mv/models/${product_id}`);
};

const ARButton = () => {
  useEffect(() => {
    if (!window.navigator.xr) {
      console.log('WebXR API not available');
      return;
    }
    const checkPermissions = async () => {
      try {
        const permissions = await navigator.permissions.query({ name: 'immersive-ar' });
        if (permissions.state === 'prompt') {
          const permissionStatus = await navigator.permissions.request({ name: 'immersive-ar' });
          if (permissionStatus.state === 'denied') {
            console.log('AR permission denied');
          }
        }
      } catch (error) {
        console.error('Error checking AR permissions:', error);
      }
    };
    checkPermissions();
  }, []);

  return (
    <model-viewer>
      <button slot="ar-button">View in AR</button>
    </model-viewer>
  );
}

const ModelView = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  // URL data
  const { client_id, product_id } = useParams();
  const [searchParams] = useSearchParams();
  const sizeQuery = searchParams?.get("size");
  // Settings
  const [, setSize] = useState();
  // Model Info
  const [found, setFound] = useState();

  // Tutorial & Help
  const [tutorialActive, setTutorialActive] = useState(false);
  const [noButtonActive, setNoButtonActive] = useState(false);
  const [dissapearingButtonActive, setDissapearingButtonActive] =
    useState(false);
  // Popups
  const [tutorialPopupActive, setTutorialPopupActive] = useState(false);
  const [faqPopupActive, setFaqPopupActive] = useState(false);
  const [bugreportActive, setBugreportActive] = useState(false);

  const [isIG, setIsIG] = useState(false);
  const [instagramChangePopupActive, setInstagramChangePopupActive] = useState(false);
  
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname, { dimension1: 'mv'});
  // }, []);

  useEffect(() => {
    const isInstagramBrowser = () => {
      const userAgent = navigator.userAgent;
      const isIOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
      const isInstagram = !!userAgent.match(/Instagram/i);
      const isWebView = !!(window.webkit && window.webkit.messageHandlers);

      return isIOS && isInstagram && isWebView;
    };

    if (isInstagramBrowser()) {
      setIsIG(true);
      setInstagramChangePopupActive(true);
    }
  }, [setInstagramChangePopupActive]);



  // TEMP ---> reportReducer
  const INITIAL_REPORT_STATE = {
    title: "Public MV report",
    messages: [],
    details: {},
  };
  const reportReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          messages: [
            {
              source: "anonymous",
              [action.payload.name]: action.payload.value,
              date: new Date(),
            },
          ],
        };
      case "NULL":
        return INITIAL_REPORT_STATE;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reportReducer, INITIAL_REPORT_STATE);
  const handleReportInputChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleReportSubmit = async () => {
    const token = await recaptchaRef.current.executeAsync();
    if (token && state.messages?.length) {
      await axios.post("/publicreports", state);
    } else {
      console.log("CAPTCHA failed");
    }
  };

  // Fetching all models for product
  const {
    isLoading,
    isError,
    isSuccess,
    data: variations,
  } = useQuery(["variations", product_id], () => fetchModelInfo(product_id), {
    onSuccess: (info) => chooseModel(info.data.models, sizeQuery),
  });

  useEffect(() => {
    if (localStorage.getItem("no-tutorial") !== "true")
      setTutorialPopupActive(true);
  }, []);
  useEffect(() => {
    if (variations) chooseModel(variations.data.models, sizeQuery);
  }, [sizeQuery, variations]);

  function chooseModel(models, sizeVar) {
    if (sizeVar) {
      const model = models?.find((m) => m.size === sizeVar);
      if (model) {
        setSize(sizeVar);
        setFound(model);
      } else {
        setSize(models[0]?.size);
        setFound(models[0]);
      }
    } else {
      if (models[0]) {
        setSize(models[0].size);
        setFound(models[0]);
      }
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

  if (isLoading) return <span className="spinner-border" />;
  if (isError) return <p>Модель не найдена, ваш URL был изменен</p>;
  if (isSuccess) {
    if (!variations) console.log("wrong URL");
    else
      return (
        <>
          <MobileView className="h-100">
            <HowToUseHelp
              active={tutorialActive}
              setActive={setTutorialActive}
            />
            <NoButtonHelp
              active={noButtonActive}
              setActive={setNoButtonActive}
            />
            <DissapearingButtonHelp
              active={dissapearingButtonActive}
              setActive={setDissapearingButtonActive}
            />
            <model-viewer
              src={API_URL + found?.model_path}
              alt="Carpet model"
              ar-modes="webxr quick-look"
              ar
              poster={'/demo/img/loading.svg'}
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
                    href={variations?.data?.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {variations?.data?.name}
                  </a>
                  <FontAwesomeIcon
                    icon={faQuestion}
                    onClick={() => setFaqPopupActive(true)}
                  />
                </div>
                <div className="container-fluid justify-content-center d-flex">
                  <select
                    className="form-select w-50 mt-2"
                    onChange={handleSizeChanged}
                    value={sizeQuery}
                  >
                    {variations.data?.models?.map(
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
              <button slot="ar-button" id="ar-button">
                Посмотреть у себя
              </button>
              <button className={isIG ? 'd-flex' : 'd-none'} id="ar-button" onClick={() => setInstagramChangePopupActive(true)}>
                Открыть в Браузере
              </button>
              <div className="container-fluid fixed-bottom pt-2 px-0 d-flex justify-content-center align-items-center flex-column">
                <button
                  className="btn btn-primary rounded-0 rounded-top"
                  onClick={() => navigate(`/modelview/${client_id}`)}
                >
                  Другой продукт
                </button>
              </div>
              <Popup active={faqPopupActive} setActive={setFaqPopupActive}>
                <div className="tutorial-popup mx-2">
                  <h3 className="mb-3 text-center">Частые вопросы:</h3>
                  <button
                    className="btn btn-outline-danger mb-1"
                    onClick={() => {
                      setFaqPopupActive(false);
                      setTutorialActive(true);
                    }}
                  >
                    Как пользоваться примеркой?
                  </button>
                  <button
                    className="btn btn-outline-dark mb-1 collapsed"
                    onClick={() => {
                      setFaqPopupActive(false);
                      setNoButtonActive(true);
                    }}
                  >
                    Нет кнопки "Примерить у себя"?
                  </button>
                  <button
                    className="btn btn-outline-dark mb-1 collapsed"
                    onClick={() => {
                      setFaqPopupActive(false);
                      setDissapearingButtonActive(true);
                    }}
                  >
                    Исчезает кнопка "Примерить у себя"
                  </button>

                  <footer className="mt-3">
                    <p
                      className="small"
                      onClick={() => {
                        setFaqPopupActive(false);
                        setBugreportActive(true);
                      }}
                    >
                      Нашли проблему? Сообщите нам
                    </p>
                  </footer>
                </div>
              </Popup>
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
              <Popup active={bugreportActive} setActive={setBugreportActive}>
                <FormGroup>
                  <h3>Отправка отзыва о сервисе "InRoom"</h3>
                  <FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Опишите свою проблему или предложение"
                      variant="outlined"
                      margin="normal"
                      rows={4}
                      multiline
                      name="text"
                      onChange={handleReportInputChange}
                    />
                  </FormControl>
                  {/* CAPTCHA */}
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="6Lck1KUjAAAAAKAtlVOTFgVboCkD3wcDBa3tJI2J"
                  />
                  <Button onClick={handleReportSubmit}>Отправить</Button>
                </FormGroup>
              </Popup>
              <Popup active={instagramChangePopupActive} setActive={setInstagramChangePopupActive}>
                <div className="tutorial-popup mx-2 h-100">
                  <FontAwesomeIcon className='float-end' icon={faXmark}  onClick={() => setInstagramChangePopupActive(false)}/>
                  <div className="h5 mb-3 text-center">Чтобы примерить, следуйте инструкции:</div>
                  <img src="/tutorial/browser/instagram-ios.jpg" alt="Change browser" className='w-100'/>
                </div>
              </Popup>
            </model-viewer>
          </MobileView>
          <BrowserView >
          <div class="sample">
            <div id="demo-container" class="demo">
              <model-viewer
                src={API_URL + found?.model_path}
                alt="Carpet model"
                ar-modes="scene-viewer webxr quick-look"
                ar 
                poster={'/demo/img/loading.svg'}
                environment-image="neutral"
                auto-rotate
                camera-controls
                camera-orbit="30deg"
                >
                </model-viewer>
            </div>
            <div class="content bg-light  text-center">
              <div className="back-btn" onClick={() => navigate(`/modelview/${client_id}`)}><FontAwesomeIcon icon={faAngleLeft} className='fa-2xl'/>Назад</div>
              
              <div class="wrapper-demo">
              
                <h1>Пожалуйста, используйте QR код</h1>
                <p className='mb-5'>Наведите камеру на QR код, чтобы открыть примерочную.</p>
                <QRCode
                  url={window.location.href}
                  isImage={true}
                  isButton={false}
                />
                <p>
                  Создано <Link to="/show">INROOM.TECH</Link>&copy;
                </p>
              </div>
            </div>
          </div>
        </BrowserView>
        </>
      );
  }
};

export default ModelView;
