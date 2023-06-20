import { ChangeEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import '../styles/Register.scss';
import '../styles/Login.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const { role } = useParams()

  interface User {
    login: string,
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

    const user: User = {
        login: login,
        password: password
    }

    switch (role) {
      case "patient":
        alert("zaloguj_patient(login, password)")
        break;
      case "doctor":
        alert("zaloguj_doctor(login, password)")
        break;
      case "admin":
        alert("zaloguj_admin(login, password)")
        break;
    }
  }

  function loginWithGoogle() {
    axios.get("http://localhost:5050/login/patient")
      .then((response) => window.location.href = response.data)
  }


  
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
            <input id="form_submit" className={`input_buttons accept_button ${role === 'doctor' ? 'login_button_doctor' : ''} ${role === 'admin' ? 'login_button_admin' : ''}`} type="submit" placeholder="Submit" value="Zaloguj"/>
          </div>
          <div onClick={()=> loginWithGoogle()} className='google_login'>LOGIN WITH GOOGLE</div>
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