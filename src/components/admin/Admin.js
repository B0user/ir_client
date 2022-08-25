import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <>
            <h1>Admins Page</h1>
            <br />
            <Link to="users">Users</Link>
            <br />
            <Link to="models">Models</Link>
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </>
    )
}

export default Admin
