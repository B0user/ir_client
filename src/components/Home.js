import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section>
            <h1>Главная</h1>
            <br />
            <Link to="/linkpage">Страница ссылок</Link>
            <br />
        </section>
    )
}

export default Home
