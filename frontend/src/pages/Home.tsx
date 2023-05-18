import React from 'react'
import "../styles/Home.scss"

function Home() {

  interface Doctor {
    id: number,
    firstName: string,
    lastName: string,
    imageSource: string,
    description: string,
  }

  const doctorList: Doctor[] = [
    {
      id: 1,
      firstName: 'Jan',
      lastName: 'Kowalski',
      imageSource: '../images/doctor.png',
      description: 'Genialny neurolog znany ze swoich wyjątkowych umiejętności diagnostycznych i kompleksowych planów leczenia, oferujący nadzieję i ulgę pacjentom złożonymi schorzeniami neurologicznymi.',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      imageSource: '../images/doctor.png',
      description: 'Wykwalifikowany ortopeda specjalizujący się w medycynie sportowej, ceniony za innowacyjne techniki i zaangażowanie w pomaganie sportowcom w powrocie do pełnej sprawności i wydajności.',
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      imageSource: '../images/doctor.png',
      description: ' Doświadczony chirurg plastyczny o niezrównanej precyzji i wrażliwości, pomagający pacjentom odzyskać pewność siebie poprzez dostarczanie naturalnych i harmonijnych rezultatów estetycznych.',
    },
    {
      id: 4,
      firstName: 'Robert',
      lastName: 'Anderson',
      imageSource: '../images/doctor.png',
      description: ' Uznany kardiolog z ogromnym doświadczeniem w interwencjach kardiologicznych, łączący najnowocześniejszą technologię z indywidualną opieką, aby poprawić zdrowie serca i ratować życie.',
    },
  ];
  
  return (
    <div id="homepage">
      {doctorList.map((doctor, index) => (
        <div>
          <div className='doctor_card'>
            <div className='column1'>
              <img src={require('../images/doctor.png')} alt={`${doctor.firstName} ${doctor.lastName}`} />
              <h1>dr {doctor.firstName}</h1>
              <h1> {doctor.lastName}</h1>
            </div>
            <div className='column2'>
              <div className='button_box'>
                <span>{doctor.description}</span>
                <a href={`/booking/${doctor.id}`} className='buttons'>ZAREZERWUJ WIZYTĘ</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home