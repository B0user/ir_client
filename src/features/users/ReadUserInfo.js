import { useRef, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const ReadUserInfo = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [roleUser, setRoleUser] = useState(false);
  const [roleClient, setRoleClient] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setErrMsg("");
  }, [user, roleUser, roleClient]);
  
  const {data, isLoading, isError, error} = useQuery([`userinfo(${id})`, id], () => axiosPrivate.get(`/users/${id}`).then((res) => {
    const info = res.data;
    setUser(info.username);
    setRoleUser(info.roles.User ? true : false);
    setRoleClient(info.roles.Client ? true : false);
    return info;
  }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    if (!v1) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
      const response = await axiosPrivate.put(
        `/users/${id}`,
        JSON.stringify({ 
            user: user,
            roles: {
                User: roleUser,
                Client: roleClient
            } 
        })
      );
      setSuccess(true);
      setUser('');
      setRoleUser(false);
      setRoleClient(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg("Update process failed");
      }
      errRef.current.focus();
    }
  };

  const onRolesChange = (role, value) => {
    setChanged(true);
    switch(role){
        case 'user':
            setRoleUser(value);
            break;
        case 'client':
            setRoleClient(value);
            break;
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.delete(`/users/${id}`);
      setSuccess(true);
      setUser('');
      setRoleUser(false);
      setRoleClient(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Delete process failed");
      }
      errRef.current.focus();
    }
  }
  if (isLoading) return(
    <span className='spinner-border'/>
  )
  if (isError) return(
    <p>Что-то пошло не так... {error}</p>
  )

  return (
    <>
      {success ? navigate('/admin/users') : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>User`s info</h1>
          <form>
            <label htmlFor="username" className="form-label">
                Username:
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => { setChanged(true); setUser(e.target.value);}}
                value={user}
                className="form-control"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>         
            <fieldset>
                <legend>Roles:</legend>
                <div>
                    <input 
                        type="checkbox" 
                        id="user" 
                        onChange={(e)=>onRolesChange('user', e.target.checked)}
                        checked={roleUser}
                    />
                    <label htmlFor="user">User</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="client" 
                        onChange={(e) => onRolesChange('client', e.target.checked)}
                        checked={roleClient}
                    />
                    <label htmlFor="client">Client</label>
                </div>
            </fieldset>
            <br />
            
            <div>
                <button onClick={(e) => handleUpdate(e)} className="btn btn-cp bg-cp-nephritis col-8" disabled={!changed ? true : false}>Update</button>
                <button onClick={(e) => handleDelete(e)} className="btn btn-cp bg-cp-pomegranate col-3 offset-1">Delete</button>
            </div>
          </form>
          <p>
            <span className="line">
              <Link to="/admin/users">Cancel</Link>
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ReadUserInfo;
