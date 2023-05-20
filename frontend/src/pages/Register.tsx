import { ChangeEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import '../styles/Register.scss';

function Register() {

  interface newUser {
    firstName: string,
    lastName: string,
    login: string,
    email: string,
    password1: string,
    password2: string,
    accept: boolean,
  }

  const[formData, setFormData] = useState ({
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    password1: '',
    password2: '',
    accept: false,
})

const { firstName, lastName, login, email, password1, password2, accept } = formData

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value, checked } = e.target;
  const newValue = name === 'accept' ? checked : value;
  setFormData((prevState) => ({
      ...prevState,
      [name]: newValue
  }))
}

const onSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault()

  if(accept) {
      if(password1 !== password2) {
          toast.error("Hasła nie są takie same!")
      } else {
        let user: newUser = {
          firstName: firstName,
          lastName: lastName,
          login: login,
          email: email,
          password1: password1,
          password2: password2,
          accept: accept
        };
        
        console.log(user)
        alert("register user")
          // const userData = {
          //     login,
          //     email,
          //     birthday,
          //     password
          // }

          // dispatch(register(userData))
      }
  }
  else {
      toast.error("Zaakceptuj regulamin!")
  }
}

  return (
    <div id='register_page'>
      <ToastContainer className={"toast"} />
      <h1 className='main_text'>REJESTRACJA</h1>
      <form id="sign_up_form" onSubmit={onSubmit}>
        <div className='input_container'>
            <label>IMIĘ:</label>
            <input type={"text"} value={firstName} required maxLength={30} name='firstName' placeholder='IMIĘ' className='input_buttons' onChange={onChange}/>
            <div className='column3'></div>
        </div>
        <div className='input_container'>
            <label>NAZWISKO:</label>
            <input type={"text"} value={lastName} required maxLength={30} name='lastName' placeholder='NAZWISKO' className='input_buttons' onChange={onChange}/>
        </div>
        <div className='input_container'>
            <label>LOGIN:</label>
            <input type={"text"} value={login} required maxLength={30} name='login' placeholder='LOGIN' className='input_buttons' onChange={onChange}/>
        </div>
        <div className='input_container'>
            <label>EMAIL:</label>
            <input type={"email"} value={email} required maxLength={30} name='email' placeholder='E-MAIL' className='input_buttons' onChange={onChange}/>
        </div>
        <div className='input_container'>
            <label>HASŁO:</label>
            <input type={"password"} value={password1} required maxLength={30} minLength={3} name='password1' placeholder='HASŁO' className='input_buttons' onChange={onChange}/>
        </div>
        <div className='input_container'>
            <label>POWTÓRZ HASŁO:</label>
            <input type={"password"} value={password2} required maxLength={30} minLength={3} name='password2' placeholder='POWTÓRZ HASŁO' className='input_buttons' onChange={onChange}/>
        </div>
        <div className='input_container checkbox'>
            <div className='column3'></div>
            <p>Akceptuję</p>
            <a id="terms_link" href="/terms">Regulamin*</a>
            <input type="checkbox" checked={accept} name='accept' className='input_buttons' onChange={onChange}/>
        </div>
        <div className='input_container'>
          <div className='column3'></div>
          <input id="form_submit" className='input_buttons accept_button' type="submit" placeholder="Submit" value="Zarejestruj"/>
        </div>
      </form>
    </div>
  )
}

export default Register