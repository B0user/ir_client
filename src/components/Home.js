import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Главная</h1>
            <br />
            <p>Вы зашли в аккаунт!</p>
            <Link to="/linkpage">Страница ссылок</Link>
            <br />
            <div className="flexGrow">
                <button onClick={signOut} className="btn btn-danger">Выйти</button>
            </div>
        </section>
    )
}

export default Home
