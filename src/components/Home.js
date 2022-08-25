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
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <Link to="/linkpage">Go to the link page</Link>
            <br />
            <div className="flexGrow">
                <button onClick={signOut} className="btn btn-danger">Sign Out</button>
            </div>
        </section>
    )
}

export default Home
