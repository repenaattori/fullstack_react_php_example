import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = "./php_backend/";

function App() {

  const [loggedUser, setLoggedUser] = useState(null);
  const [errorText, setErrorText] = useState("");
  
  //Check login by session for the first time
  useEffect(()=>{
    axios.post(URL+"rest_login.php", {}, {withCredentials:true} )
      .then(resp => setLoggedUser(resp.data))
      .catch(e => console.log(e.message));
  }, []);

  //Logging out -> server ends the session
  function logout(){
    axios.get(URL+"rest_logout.php", {withCredentials:true} )
      .then(resp => setLoggedUser(null))
      .catch(e => console.log(e.message));
  }

  //Conditional rendering depending on the login status.
  return (
    <div>
      {loggedUser && <button type="button" onClick={logout}>Logout</button>}
      {loggedUser ? 
        <UserPage uname={loggedUser}/> : 
        <Login setLoggedUser={setLoggedUser} setError={setErrorText}/>
      }
      {!loggedUser && <h3 style={{color:'red'}}>{errorText}</h3>}
    </div>
  );
}

/**
 * Login form. Sends the login data to the server and
 * sets the parent component username state if the login is successful.
 * Unsuccessful login sets error text retrieved from the server
 */
function Login({setLoggedUser, setError}){
  const [uname, setUname] = useState("");
  const [pw, setPw] = useState("");

  //Function for logging in with username/password
  function logIn(){
    const formData = new FormData();
    formData.append("uname", uname);
    formData.append("pw", pw);

    axios.post(URL+"rest_login.php", formData, {withCredentials:true} )
      .then(resp => {
        setLoggedUser(resp.data);
        setError("");
      })
      .catch(e=> setError(e.response.data));
  }

  return (
    <form>
      <label>Username:</label>
      <input type="text" value={uname} onChange={e=>setUname(e.target.value)}/>
      <label>Password:</label>
      <input type="password" value={pw} onChange={e=>setPw(e.target.value)}/>
      <button type="button" onClick={logIn}>Login</button>
    </form>
  )
}

/**
 * Showing the user page and retieving the user messages from the server
 */
function UserPage({uname}){
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get(URL+"rest_user_info.php", {withCredentials:true})
      .then(resp=> setMessages(resp.data.messages))
      .catch(e=>console.log(e.message))
  }, []);

  return(
    <div>
      <h1>Welcome {uname}. Your message:</h1>
      <ul>
        {messages.map((msg,i)=> <li key={"a"+i}>{msg}</li>)}
      </ul>
    </div>
  )
}


/**
 * Register component. Sends the register data to server as JSON and
 * sets the parent username state if the register and login is successful.
 * Not used in this app.
 */
function Register({setUser}){
  const [uname, setUname] = useState("");
  const [pw, setPw] = useState("");

  function register(e){

    const json = {uname, pw}; //same as {uname:uname, pw:pw}

    //Sendig form data to server register. WithCredentials is required for cookies/sessions to work.
    //Successful response sets the parent component username state
    axios.post(URL+"rest_register.php",  json, {withCredentials: true})
      .then(resp => setUser(uname))
      .catch(e=> console.log(e.message));
  }

  return(
    <div>
      <form>
        <label>
          Username:
          <input type="text" onChange={e=>setUname(e.target.value)}></input>
        </label>
        <label>
          Password:
          <input type="password" onChange={e=>setPw(e.target.value)}></input>
        </label>
        <button type="button" onClick={register}>Register</button>
      </form>
    </div>
  )
}


export default App;
