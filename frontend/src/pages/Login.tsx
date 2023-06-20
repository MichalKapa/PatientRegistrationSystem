import { ChangeEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import '../styles/Register.scss';
import '../styles/Login.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function Login() {

  const { role } = useParams()

  interface User {
    username: string,
    password: string,
  }

  const[formData, setFormData] = useState ({
    login: '',
    password: '',
})

const { login, password } = formData

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
  }))
}


const onSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault()
  }

  function loginWithGoogle() {
    axios.get("http://localhost:5050/login/patient")
      .then((response) => window.location.href = response.data)
  }

  const handleGoogleResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in response) {
      const { accessToken } = response;
      console.log(response)

      // Send the access token to your backend for signup verification
      // You can use Axios or any other HTTP library to make the API call

      console.log('Access Token:', accessToken);
    }
  };

  const handleGoogleFailure = (error: any) => {
    console.error('Google SSO Sign Up failed:', error);
  };

  function loginDoctor(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    axios.post("http://localhost:5050/login/doctor", formData)
    .then((response) => {
      if (response.status === 401) {
        console.log("Unauthorized");
      } else {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user_role', "doctor");
        window.location.href = "http://localhost:3000";
      }
    })
    .catch((error) => toast.error("Niepoprawne dane logowania!"));
  }
  function loginAdmin(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    axios.post("http://localhost:5050/login/admin", formData)
    .then((response) => {
      if (response.status === 401) {
        console.log("Unauthorized");
      } else {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user_role', "admin");
        window.location.href = "http://localhost:3000";
      }
    })
    .catch((error) => toast.error("Niepoprawne dane logowania!"));
  }


  const loginButton = role == 'admin' ?
  (<input id="form_submit" onClick={() => loginAdmin(login, password)} className={`input_buttons accept_button login_button_admin`} type="submit" placeholder="Submit" value="Zaloguj"/>)
  : (<input id="form_submit" onClick={() => loginDoctor(login, password)} className={`input_buttons accept_button login_button_doctor`} type="submit" placeholder="Submit" value="Zaloguj"/>)
  
  
  if (["admin", "patient", "doctor"].includes(role as string)) {
    return (
      <div id='register_page'>
        <ToastContainer className={"toast"} />
        <div className='login_buttons'>
          <a href="/login/patient" className={`login_button_patient ${role === 'patient' ? '': 'login_button_gray'}`}>PACJENT</a>
          <a href="/login/doctor" className={`login_button_doctor ${role === 'doctor' ? '' : 'login_button_gray'} `}>DOKTOR</a>
        </div>
        <h1 className='main_text login_text'>LOGOWANIE</h1>
        <form id="sign_up_form" onSubmit={onSubmit}>
          <div className='input_container'>
              <label>LOGIN:</label>
              <input type={"text"} value={login} required maxLength={30} name='login' placeholder='LOGIN' className='input_buttons' onChange={onChange}/>
          </div>
          <div className='input_container'>
              <label>HASŁO:</label>
              <input type={"password"} value={password} required maxLength={30} name='password' placeholder='HASŁO' className='input_buttons' onChange={onChange}/>
          </div>
          <div className='input_container login_accept'>
            <div className='column3'></div>
            {loginButton}
          </div>
            <div onClick={()=> loginWithGoogle()} className={`google_login ${role === 'patient' ? '' : 'hidden'}`}>
            <h1>ZALOGUJ Z KONTEM GOOGLE</h1>
          </div>
          <GoogleLogin
            clientId="51147604812-bimdr2gb13fqak47u80gmnkpdousuu7b.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={handleGoogleResponse}
            onFailure={handleGoogleFailure}
            cookiePolicy="single_host_origin"
          />
        </form>
      </div>
    )
  }

  else {
    return (
      <div id='register_page'>
      </div>
    )
  }
}

export default Login