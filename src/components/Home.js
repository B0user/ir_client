// import { Link } from "react-router-dom";
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

const Home = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "#036830" }}>
  <div className="container-fluid">
    <a className="navbar-brand d-flex align-items-center" href="#">
      <img src="/landing/img/logo.png" width={26} height={26} alt="Logo" className="me-2" />
      INROOM
    </a>
    <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="tel:+11234567890">
            <i className="fas fa-phone" />
            +1 123 456 7890
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="mailto:inroom.tech.info@gmail.com">
            <i className="fas fa-envelope" />
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
    <video
      autoPlay=""
      loop=""
      muted=""
      playsInline=""
      className="background-video w-100 h-100 position-absolute"
      style={{
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        objectFit: "cover"
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
              Увеличьте онлайн-продажи в 2 раза с виртуальной примеркой INROOM
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
  <section style={{ backgroundColor: "#004F24", padding: "75px 0" }}>
    <div className="container">
      <h2 className="text-center text-white mb-4">Частая проблема?</h2>
      <div className="">
        <div className="p-3 d-flex align-items-center">
          <img
            src="/landing/img/problem1.png"
            className="me-3"
            width={35}
            height={35}
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
            width={35}
            height={35}
            alt="Problem 2"
          />
          <p className="text-white small mt-2">Высокий процент возвратов</p>
        </div>
        <div className="p-3 d-flex align-items-center">
          <img
            src="/landing/img/problem3.png"
            className="me-3"
            width={35}
            height={35}
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
  <section style={{ backgroundColor: "#036830", padding: "75px 0" }}>
    <div className="container">
      <h2 className="text-center text-white mb-2">Решите все разом с INROOM</h2>
      <div className="h6 text-center text-white mb-4">
        ( полный пакет услуг дополненной реальности под ключ )
      </div>
      <div className="">
        <div className="p-3 d-flex align-items-center">
          <img
            src="/landing/img/solution1.png"
            className="me-3"
            width={35}
            height={35}
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
            width={35}
            height={35}
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
            width={35}
            height={35}
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
            <li className="bg-light my-1 list-group-item">Клиент переходит по ссылке</li>
            <li className="bg-light my-1 list-group-item">"Примеряет" в своем интерьере</li>
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
          <div className="row">
            <div className="col-12 col-md-6 my-3">
              <video
                src="/landing/video.mp4"
                className="rounded w-100"
                style={{ height: 300 }}
              />
            </div>
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
                  className="feature-img mr-3"
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="my-3">Увеличьте продажи в 2 раза с AR</h3>
                  <p>
                   После внедрения AR бренд EQ3 получил прирост конверсии покупателей на 112% и в общем привлек на 429% больше покупателей
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
                    Затягивающий и запоминающийся - так можно описать опыт взаимодействия с AR примерками
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="feature-section bg-white p-4 align-items-center">
                <img
                  src="/landing/img/feature3.png"
                  alt="Feature 3"
                  className="feature-img mr-3"
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
                Наши услуги востребованны на рынке
              </h3>
              <a href="#request" className="btn btn-danger rounded-pill w-100">
                Успейте оставить заявку
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light" id="request">
        <div className="container">
          <h2 className="text-center mb-5">Оставить заявку</h2>
          <form>
            <div className="form-group my-2">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Введите ваше имя"
                required=""
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Введите ваш email"
                required=""
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="phone">Телефон</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <select className="form-control" id="countryCode">
                    <option value={+7}>+7</option>
                  </select>
                </div>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Оставьте ваш номер телефона"
                  pattern="\(\d{3}\) \d{3}-\d{4}"
                  required=""
                />
              </div>
            </div>
            <div className="form-group my-2">
              <label htmlFor="message">
                Опишите, как хотите применить AR (опционально)
              </label>
              <textarea
                className="form-control"
                id="message"
                rows={3}
                placeholder="Хочу сделать виртуальную примерку ковров..."
                defaultValue={""}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Оставить заявку
            </button>
          </form>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="text-center text-white">Copyright INROOM.TECH© 2023</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
