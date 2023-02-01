import { Link } from "react-router-dom";
import "./main.css";

const Home = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#036830" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="/landing/logo.png"
              width={26}
              height={26}
              alt="Logo"
              className="mr-2"
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
            <ul className="navbar-nav ml-auto">
              {/* <li class="nav-item">
          <a class="nav-link" href="#">Landing</a>
        </li> */}
              <li className="nav-item">
                <a className="nav-link" href="tel:+11234567890">
                  <i className="fas fa-phone" />
                  +1 123 456 7890
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="mailto:info@example.com">
                  <i className="fas fa-envelope" />
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center"
        style={{ backgroundColor: "#036830", height: "100vh" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <h1 className="text-white mb-5 display-1">
                  Примерка мебели не выходя из дома
                </h1>
                <p className="text-white mb-5 h3">
                  Увеличьте онлайн-продажи в 2 раза с виртуальной примеркой
                  INROOM
                </p>
                <a
                  href="#request"
                  className="btn btn-danger rounded-pill px-4 py-3 w-100 comp-400"
                  style={{ maxWidth: 320 }}
                >
                  ОСТАВИТЬ ЗАЯВКУ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How Section */}
      <section id="how-works" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Как это работает?</h2>
          <ol className="text-justify h5">
            <li className="my-3">Клиент переходит по ссылке</li>
            <li className="my-3">"Примеряет" в своем интерьере</li>
            <li className="my-3">
              Процесс “примерки” вовлекает клиента в новый опыт взаимодействия с
              вашим брендом
            </li>
            <li className="my-3">
              С большей вовлеченностью клиент покупает ваш товар
            </li>
            <li className="my-3">
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
            Мировые лидеры индустрии используют виртуальные примерки
          </h2>
          <div className="row">
            <div className="col-12 col-md-4 text-center">
              <img
                src="/landing/brand1.png"
                className="img-fluid mb-3 logo-img"
                alt="Company Logo 1"
              />
              <h5 className="mb-2">The Home Depot</h5>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img
                src="/landing/brand2.png"
                className="img-fluid mb-3 logo-img"
                alt="Company Logo 2"
              />
              <h5 className="mb-2">IKEA Place</h5>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img
                src="/landing/brand3.png"
                className="img-fluid mb-3 logo-img"
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
                  src="/landing/feature1.png"
                  alt="Feature 1"
                  className="feature-img mr-3"
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="my-3">Увеличьте продажи в 2 раза с AR</h3>
                  <p>
                    {" "}
                    с помощью технологий дополненной реальности вы сможете
                    увеличить прибыль в 2 раза и сейчас у вас есть шанс!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="feature-section bg-light p-4 align-items-center">
                <img
                  src="/landing/feature2.png"
                  alt="Feature 2"
                  className="feature-img ml-3"
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="my-3">Будьте на связи со своими клиентами</h3>
                  <p>
                    С помощью нашего сервиса покупатели могут примерять ковры и
                    предметы интерьера, не выходя из дома, используя только
                    камеру своего смартфона
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="feature-section bg-white p-4 align-items-center">
                <img
                  src="/landing/feature3.png"
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
