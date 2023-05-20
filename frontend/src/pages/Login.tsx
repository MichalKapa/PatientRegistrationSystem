import { ChangeEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import '../styles/Register.scss';
import '../styles/Login.scss';

function Login() {

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
    alert("zaloguj")
    // dispatch(loginU(user))
}

  return (
    <div id='register_page'>
      <ToastContainer className={"toast"} />
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
          <input id="form_submit" className='input_buttons accept_button' type="submit" placeholder="Submit" value="Zaloguj"/>
        </div>
      </form>
    </div>
  )
}

export default Login