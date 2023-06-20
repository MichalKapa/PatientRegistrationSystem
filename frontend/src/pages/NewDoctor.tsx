import "../styles/NewDoctor.scss";
import { useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function NewDoctor() {

    interface Doctor {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        imageSource: string,
        description: string,
      }

      const doctorList: Doctor[] = [
        {
          id: 0,
          firstName: 'Jan',
          lastName: 'Kowalski',
          email: 'jan.kowalski@gmail.com',
          imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
          description: 'Genialny neurolog znany ze swoich wyjątkowych umiejętności diagnostycznych i kompleksowych planów leczenia, oferujący nadzieję i ulgę pacjentom złożonymi schorzeniami neurologicznymi.',
        },
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
          description: 'Wykwalifikowany ortopeda specjalizujący się w medycynie sportowej, ceniony za innowacyjne techniki i zaangażowanie w pomaganie sportowcom w powrocie do pełnej sprawności i wydajności.',
        },
        {
          id: 2,
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@gmail.com',
          imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
          description: ' Doświadczony chirurg plastyczny o niezrównanej precyzji i wrażliwości, pomagający pacjentom odzyskać pewność siebie poprzez dostarczanie naturalnych i harmonijnych rezultatów estetycznych.',
        },
    ]

    interface newDoctor{
        firstName: string,
        lastName: string,
        email: string,
        password1: string,
        password2: string,
      }

      const[formData, setFormData] = useState ({
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
      }

    const { firstName, lastName, email, password1, password2 } = formData

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        registerDoctor()
        // console.log(password1)
        // console.log(password2)
        //     if(password1 !== password2) {
        //         toast.error("Hasła nie są takie same!")
        //         alert("AAAA")
        //     } else {
        //       const doctor: newDoctor = {
        //         firstName: firstName,
        //         lastName: lastName,
        //         email: email,
        //         password1: password1,
        //         password2: password2,
        //       };
              
        //       console.log(doctor)
        //       alert("register doctor")
        //     }
        }

    const { id } = useParams<{ id: string }>();

    const isAddPage = id===undefined
    const pageTitle = isAddPage ? "DODAWANIE LEKARZA" : "EDYCJA LEKARZA"
    
    useEffect(() => {
        if (!isAddPage) {
            const editedDoctor = doctorList[parseInt(id)]
            setFormData({
              firstName: editedDoctor.firstName,
              lastName: editedDoctor.lastName,
              email: editedDoctor.email,
              password1: '',
              password2: '',
            })    
        }
    }, [formData]);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleIconClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
    let file: File | undefined
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    file = event.target.files?.[0];
    if (file) {
      // Perform upload logic here
      console.log('Uploaded file:', file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  function registerDoctor() {
    if (password1 !== password2) {
      toast.error("Hasła nie są takie same!");
    } else {
      const requestData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password2,
        description: text
      };
  
      axios.post("http://localhost:5050/register/doctor", requestData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 401) {
            console.log("Unauthorized");
          } else {
            window.location.href = "http://localhost:3000/show/doctors";
          }
        })
        .catch((error) => {
          toast.error("Błąd!");
          console.log(error);
        });
    }
  }

  return (
    <div id="new_doctor_page">
      <ToastContainer className={"toast"} />
        <h1 className="main_text">{pageTitle}</h1>
        <form id="sign_up_form" onSubmit={onSubmit}>
            <div className="columns">
                <div className="column1">
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
                    <div className='column3'></div>
                </div>
                <div className="column2">
                    <div className="img_container">
                        <h3 className="">ZDJĘCIE:</h3>
                        {/* <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        /> */}
                        <img
                            src={imageSrc || require("../images/img_icon.png")}
                            alt="Image Icon"
                            onClick={handleIconClick}
                        />
                    </div>

                    <div className="description_container">
                        <h3>OPIS:</h3>
                        <div className="description_wrapper">
                        <textarea className="description_input"
                            value={text}
                            onChange={handleChange}
                            placeholder="Opis..."
                            rows={4}
                            cols={50}
                            required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <input id="form_submit" className='input_buttons accept_button' type="submit" placeholder="Submit" value="Zarejestruj"/>
        </form>
        
    </div>
  )
}

export default NewDoctor