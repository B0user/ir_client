import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Ссылки</h1>
            <br />
            <Link to="/login">Войти в аккаунт</Link>
            {/* <Link to="/register">Зарегистрироваться</Link> */}
            <br />
        </section>
    )
}

export default LinkPage
