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
import "../../mv.css";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
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
  if (isError) return <p>???????????? ???? ??????????????, ?????? URL ?????? ??????????????</p>;
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
                      text: "?????????????????? ?????????? ???? ???????????? ???? ????????",
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
                ???????????????????? ?? ????????
              </button>
              <div className="container-fluid fixed-bottom pt-2 px-0 d-flex justify-content-center align-items-center flex-column">
                <button
                  className="btn btn-primary rounded-0 rounded-top"
                  onClick={() => navigate(`/modelview/${client_id}`)}
                >
                  ???????????? ??????????????
                </button>
              </div>
              <Popup active={faqPopupActive} setActive={setFaqPopupActive}>
                <div className="tutorial-popup mx-2">
                  <h3 className="mb-3 text-center">???????????? ??????????????:</h3>
                  <button
                    className="btn btn-outline-danger mb-1"
                    onClick={() => {
                      setFaqPopupActive(false);
                      setTutorialActive(true);
                    }}
                  >
                    ?????? ???????????????????????? ???????????????????
                  </button>
                  <button
                    className="btn btn-outline-dark mb-1 collapsed"
                    onClick={() => {
                      setFaqPopupActive(false);
                      setNoButtonActive(true);
                    }}
                  >
                    ?????? ???????????? "?????????????????? ?? ????????"?
                  </button>
                  <button
                    className="btn btn-outline-dark mb-1 collapsed"
                    onClick={() => {
                      setFaqPopupActive(false);
                      setDissapearingButtonActive(true);
                    }}
                  >
                    ???????????????? ???????????? "?????????????????? ?? ????????"
                  </button>

                  <footer className="mt-3">
                    <p
                      className="small"
                      onClick={() => {
                        setFaqPopupActive(false);
                        setBugreportActive(true);
                      }}
                    >
                      ?????????? ????????????????? ???????????????? ??????
                    </p>
                  </footer>
                </div>
              </Popup>
              <Popup
                active={tutorialPopupActive}
                setActive={setTutorialPopupActive}
              >
                <div className="tutorial-popup mx-2">
                  <p>???????????? ???????????? ?????????????? ?????????????????</p>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        setTutorialPopupActive(false);
                        setTutorialActive(true);
                      }}
                    >
                      ????
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => setTutorialPopupActive(false)}
                    >
                      ??????
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setTutorialPopupActive(false);
                        localStorage.setItem("no-tutorial", "true");
                      }}
                    >
                      ??????????????
                    </button>
                  </div>
                </div>
              </Popup>
              <Popup active={bugreportActive} setActive={setBugreportActive}>
                <FormGroup>
                  <h3>???????????????? ???????????? ?? ?????????????? "InRoom"</h3>
                  <FormControl>
                    <TextField
                      id="outlined-basic"
                      label="?????????????? ???????? ???????????????? ?????? ??????????????????????"
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
                  <Button onClick={handleReportSubmit}>??????????????????</Button>
                </FormGroup>
              </Popup>
            </model-viewer>
          </MobileView>
          <BrowserView className="text-center">
            <h1>????????????????????, ?????????????????????? QR ??????</h1>
            <p>???????????????? ???????????? ???? QR ??????, ?????????? ?????????????? ??????????????????????.</p>
            <QRCode
              url={window.location.href}
              isImage={true}
              isButton={false}
            />
            <p>
              ?????????????? <Link to="/">INROOM.TECH</Link>&copy;
            </p>
          </BrowserView>
        </>
      );
  }
};

export default ModelView;
