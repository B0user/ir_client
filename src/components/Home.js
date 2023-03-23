// import { Link } from "react-router-dom";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../api/axios";
import { FormGroup, FormControl, TextField, Button } from "@mui/material";

const styles = {
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
    marginTop: "10vh",
  },
  circle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  },

  circleSvg: {
    width: "50%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    textAlign: "center",
    fontSize: "10px",
    width: "120px",
  },
};

const ContactForm = () => {
  const recaptchaRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    await axios.post("/contactform", formData);
    // try {
    //   setRecaptchaToken(await recaptchaRef.current.executeAsync());
    // } catch (error) {
    //   console.error(error);
    //   setRecaptchaError(error.message);
    // }
    // if (recaptchaToken) {
    //   try {
    //     await axios.post("/contactform", formData);
    //     setFormSubmitted(true);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <section className="py-5 bg-light" id="request">
      <div className="container">
        <FormGroup>
          <h3 className="text-center mb-3">Оставить заявку</h3>
          <FormControl>
            <TextField
              required
              id="outlined-required"
              label="Ваше имя"
              variant="outlined"
              margin="dense"
              name="name"
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Ваш email"
              variant="outlined"
              margin="dense"
              name="email"
              type="email"
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Ваш номер"
              variant="outlined"
              margin="dense"
              name="phone"
              type="tel"
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Опишите как хотите применить AR (опционально)"
              variant="outlined"
              margin="normal"
              rows={4}
              multiline
              name="message"
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              formSubmitted
            }
            className="btn btn-primary btn-block"
          >
            Отправить
          </Button>
        </FormGroup>
      </div>
      {recaptchaError && (
        <div className="alert alert-danger mt-2" role="alert">
          {recaptchaError}
        </div>
      )}
      {formSubmitted && (
        <div className="alert alert-success mt-2" role="alert">
          Мы получили ваш запрос!
        </div>
      )}
    </section>
  );
};

const Home = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ background: "#000", opacity: "0.6" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="/landing/img/logo.png"
              width={26}
              height={26}
              alt="Logo"
              className="me-2"
            />
            INROOM
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="tel:+77051051127">
                  <i className="fas fa-phone me-2" />
                  +7 705 105 1127
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="mailto:inroom.tech.info@gmail.com"
                >
                  <i className="fas fa-envelope me-2" />
                  inroom.tech.info@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center position-relative"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", height: "100vh" }}
      >
        {/* <video autoPlay loop muted>
      <source src="/landing/video/video.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video w-100 h-100 position-absolute"
          style={{
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: "cover",
          }}
        >
          <source src="/landing/video/video.mp4" type="video/mp4" />
        </video>
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <h1 className="text-white mb-5 display-1 fw-bold">
                  Примерка мебели не выходя из дома
                </h1>
                <p className="text-white mb-5 h4">
                  Увеличьте онлайн-продажи в 2 раза с виртуальной примеркой
                  INROOM
                </p>
                <a
                  href="#request"
                  className="btn btn-danger rounded-pill px-4 py-3 w-100"
                  style={{ maxWidth: 320 }}
                >
                  ОСТАВИТЬ ЗАЯВКУ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Problem section */}
      <section style={{ backgroundColor: "#036830", padding: "75px 0" }}>
        <div className="container">
          <h2 className="text-center text-white mb-4">Частая проблема?</h2>
          <div className="">
            <div className="p-3 d-flex align-items-center">
              <img
                src="/landing/img/problem1.png"
                className="me-3"
                width={50}
                height={50}
                alt="Problem 1"
              />
              <p className="text-white small mt-2">
                Сложно завлечь клиентов онлайн
              </p>
            </div>
            <div className="p-3 d-flex align-items-center">
              <img
                src="/landing/img/problem2.png"
                className="me-3"
                width={50}
                height={50}
                alt="Problem 2"
              />
              <p className="text-white small mt-2">Высокий процент возвратов</p>
            </div>
            <div className="p-3 d-flex align-items-center">
              <img
                src="/landing/img/problem3.png"
                className="me-3"
                width={50}
                height={50}
                alt="Problem 3"
              />
              <p className="text-white small mt-2">
                Работники устают возить товары на примерку
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Solution section */}
      <section style={{ backgroundColor: "#008F40", padding: "75px 0" }}>
        <div className="container">
          <h2 className="text-center text-white mb-2">
            Решите все разом с INROOM
          </h2>
          <div className="h6 text-center text-white mb-4">
            ( полный пакет услуг дополненной реальности под ключ )
          </div>
          <div className="">
            <div className="p-3 d-flex align-items-center">
              <img
                src="/landing/img/solution1.png"
                className="me-3"
                width={50}
                height={50}
                alt="Solution 1"
              />
              <p className="text-white small mt-2">
                Создание реалистичного 3Д клона товара с точным соответствием
                размеров
              </p>
            </div>
            <div className="p-3 d-flex align-items-center">
              <img
                src="/landing/img/solution2.png"
                className="me-3"
                width={50}
                height={50}
                alt="Solution 2"
              />
              <p className="text-white small mt-2">
                Клиент примеряет ваш товар через камеру смартфона
              </p>
            </div>
            <div className="p-3 d-flex align-items-center">
              <img
                src="/landing/img/solution3.png"
                className="me-3"
                width={50}
                height={50}
                alt="Solution 3"
              />
              <p className="text-white small mt-2">
                Продажа “на месте” и интеграция с вашими онлайн-платформами
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How Section */}
      <section id="how-works" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Как это работает?</h2>
          <ol className="text-justify list-group list-group-numbered">
            <li className="bg-light my-1 list-group-item">
              Клиент переходит по ссылке
            </li>
            <li className="bg-light my-1 list-group-item">
              "Примеряет" в своем интерьере
            </li>
            <li className="bg-light my-1 list-group-item">
              Процесс “примерки” вовлекает клиента в новый опыт взаимодействия с
              вашим брендом
            </li>
            <li className="bg-light my-1 list-group-item">
              С большей вовлеченностью клиент покупает ваш товар
            </li>
            <li className="bg-light my-1 list-group-item">
              Клиент с удовольствием вспоминает о вашем бренде в будущем
            </li>
          </ol>
          {/* <div className="row">
            <div className="col-12 col-md-6 my-3">
              <video
                src="/landing/video.mp4"
                className="rounded w-100"
                style={{ height: 300 }}
              />
            </div>
          </div> */}
        </div>
        <div>
        <div style={styles.body}>
          <div>
            <div style={styles.circle}>
              <svg
                fill="#000000"
                width="800px"
                height="800px"
                viewBox="-1.5 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                class="cf-icon-svg"
              >
                <path d="M2.461 7.02a1.61 1.61 0 0 1 1.61 1.611v2.456h7.857V8.63a1.61 1.61 0 1 1 1.988 1.566v4.634a.476.476 0 0 1-.475.475H2.559a.476.476 0 0 1-.475-.475v-4.634A1.61 1.61 0 0 1 2.46 7.02zm1.059-.894a2.68 2.68 0 0 0-.227-.084V4.669A1.111 1.111 0 0 1 4.4 3.56h7.198a1.111 1.111 0 0 1 1.108 1.109v1.373a2.679 2.679 0 0 0-.227.084 2.717 2.717 0 0 0-1.66 2.505v1.347H5.18V8.631a2.72 2.72 0 0 0-1.66-2.505z" />
              </svg>
            </div>
          </div>
    
          <div
            style={{
              margin: "2%",
              width: "120px",
              height: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="-6 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.56 15.44l-6.8-6.92c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.44 5.44h-16.2c-0.44 0-0.8 0.36-0.8 0.84s0.36 0.84 0.84 0.84h16.2l-5.48 5.44c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24l6.88-6.88c0 0 0.56-0.52-0.080-1.16z"></path>
            </svg>
          </div>
    
          <div>
            <div style={styles.circle}>
              <svg
                fill="#000000"
                width="800px"
                height="800px"
                viewBox="0 0 36 36"
                version="1.1"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.42,9.09l-13-6a1,1,0,0,0-.84,0l-13,6A1,1,0,0,0,4,10V27a1,1,0,0,0,.58.91l13,6a1,1,0,0,0,.84,0l13-6A1,1,0,0,0,32,27V10A1,1,0,0,0,31.42,9.09ZM18,5.1,28.61,10,18,14.9,7.39,10ZM6,11.56l11,5.08v14.8L6,26.36ZM19,31.44V16.64l11-5.08v14.8Z"
                  class="clr-i-outline clr-i-outline-path-1"
                ></path>
                <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
              </svg>
            </div>
          </div>
    
          <div
            style={{
             margin: "2%",
              width: "120px",
              height: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="-6 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.56 15.44l-6.8-6.92c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.44 5.44h-16.2c-0.44 0-0.8 0.36-0.8 0.84s0.36 0.84 0.84 0.84h16.2l-5.48 5.44c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24l6.88-6.88c0 0 0.56-0.52-0.080-1.16z"></path>
            </svg>
          </div>
    
          <div>
            <div style={styles.circle}>
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.7574 10.5858L4.92897 13.4142C3.7574 14.5858 3.7574 16.4853 4.92897 17.6569L6.34319 19.0711C7.51476 20.2427 9.41425 20.2427 10.5858 19.0711L13.4143 16.2427M9.87873 14.1214L14.1214 9.87873M10.5858 7.7574L13.4142 4.92897C14.5858 3.7574 16.4853 3.7574 17.6569 4.92897L19.0711 6.34319C20.2427 7.51476 20.2427 9.41425 19.0711 10.5858L16.2427 13.4143"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
        style={{ display: "flex", gridTemplateColumns: "repeat(3, 1fr)", paddingTop: "1rem", paddingLeft: "26.5rem", gap: "180px ", fontSize: "12px"}}
      >
        <p style = {{gridColumn: "1", width: "150px", flexbasis: "33.33%",
        flexgrow: "1", textAlign: "center"}}>Выбор необходимого ассортимента товаров</p>
        <p style = {{gridColumn: "2", width: "150px", textAlign: "center"}}>Инрум создает и адаптирует 3д модели под дополненную реальность</p>
        <p style = {{gridColumn: "3", width: "150px", textAlign: "center"}}>Клиент получает ссылку на товар в примерке, которую может использовать в демонстрациях </p>
      </div>
      </div>
      </section>
      <section
        id="companies-using-our-product"
        className="py-5"
        style={{ backgroundColor: "#D2FFE6" }}
      >
        <div className="container">
          <h2 className="text-center my-5">
            Лидеры индустрии используют AR примерки
          </h2>
          <div className="row">
            <div className="col-12 col-md-4 text-center">
              <img
                src="/landing/img/brand1.png"
                className="mb-3 logo-img"
                alt="Company Logo 1"
              />
              <h5 className="mb-2">The Home Depot</h5>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img
                src="/landing/img/brand2.png"
                className="mb-3 logo-img"
                alt="Company Logo 2"
              />
              <h5 className="mb-2">IKEA Place</h5>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img
                src="/landing/img/brand3.png"
                className="mb-3 logo-img"
                alt="Company Logo 3"
              />
              <h5 className="mb-2">Wayfair</h5>
            </div>
          </div>
        </div>
      </section>
      {/* Motivational Section */}
      <section
        id="examples"
        className="py-5"
        style={{ backgroundColor: "#004F24" }}
      >
        <div className="container my-5">
          <h2 className="text-center text-white mb-5">
            Повышайте прибыль с AR технологиями
          </h2>
          <p
            className="text-white mb-5 h5"
            style={{ fontVariant: "all-small-caps" }}
          >
            Обеспечьте впечатляющий опыт для покупателей, где бы они ни
            находились! <br /> Мы поможем внедрить AR в ваш бизнес уже сегодня
          </p>
          <a
            href="#request"
            className="btn btn-danger rounded-pill px-4 py-3 w-100 comp-400"
            style={{ maxWidth: 320 }}
          >
            ПОПРОБОВАТЬ AR
          </a>
        </div>
      </section>
      <section id="features" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="feature-section bg-white p-4 align-items-center">
                <img
                  src="/landing/img/feature1.png"
                  alt="Feature 1"
                  className="feature-img me-3"
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="my-3">Увеличьте продажи в 2 раза с AR</h3>
                  <p>
                    После внедрения AR бренд EQ3 получил прирост конверсии
                    покупателей на 112% и в общем привлек на 429% больше
                    покупателей
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="feature-section bg-light p-4 align-items-center">
                <img
                  src="/landing/img/feature2.png"
                  alt="Feature 2"
                  className="feature-img ml-3"
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="my-3">Будьте на связи со своими клиентами</h3>
                  <p>
                    Затягивающий и запоминающийся - так можно описать опыт
                    взаимодействия с AR примерками
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="feature-section bg-white p-4 align-items-center">
                <img
                  src="/landing/img/feature3.png"
                  alt="Feature 3"
                  className="feature-img me-3"
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="my-3">Клиенты готовы платить больше</h3>
                  <p>
                    40% людей готовы заплатить больше за товар, если им
                    предложат услуги технологии AR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section id="cta" className="bg-success text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto text-center">
              <h3 className="mb-3 text-white">
                Наши услуги очень востребованны на рынке
              </h3>
              <a href="#request" className="btn btn-danger rounded-pill w-100">
                Успейте оставить заявку
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Footer */}
      <footer className="py-5 bg-dark">
        <div className="container">
          <div className="d-flex flex-column align-items-center mb-3">
            <div className="h4 text-white">Свяжитесь с нами:</div>
            <a
              href="tel:+77051051127"
              className="text-center text-white mb-3 text-decoration-none"
            >
              <i className="fas fa-phone me-2"></i>
              +7 705 105 1127
            </a>
            <a
              href="mailto:inroom.tech.info@gmail.com"
              className="text-center text-white mb-3 text-decoration-none"
            >
              <i className="fas fa-envelope me-2"></i>
              inroom.tech.info@gmail.com
            </a>
          </div>
          <a
            href="https://wa.me/message/3YWQEJSHGMSQB1"
            className="btn btn-success mb-3 w-100"
          >
            <i className="fab fa-whatsapp me-2"></i>
            Написать на WhatsApp
          </a>
          <p className="text-center text-white mt-3">
            Copyright INROOM.TECH© 2023
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
