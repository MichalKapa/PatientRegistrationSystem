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
      imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
      description: 'Genialny neurolog znany ze swoich wyjątkowych umiejętności diagnostycznych i kompleksowych planów leczenia, oferujący nadzieję i ulgę pacjentom złożonymi schorzeniami neurologicznymi.',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
      description: 'Wykwalifikowany ortopeda specjalizujący się w medycynie sportowej, ceniony za innowacyjne techniki i zaangażowanie w pomaganie sportowcom w powrocie do pełnej sprawności i wydajności.',
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
      description: ' Doświadczony chirurg plastyczny o niezrównanej precyzji i wrażliwości, pomagający pacjentom odzyskać pewność siebie poprzez dostarczanie naturalnych i harmonijnych rezultatów estetycznych.',
    },
    {
      id: 4,
      firstName: 'Robert',
      lastName: 'Anderson',
      imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
      description: ' Uznany kardiolog z ogromnym doświadczeniem w interwencjach kardiologicznych, łączący najnowocześniejszą technologię z indywidualną opieką, aby poprawić zdrowie serca i ratować życie.',
    },
    {
      id: 5,
      firstName: 'Jan',
      lastName: 'Kowalski',
      imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
      description: 'Genialny neurolog znany ze swoich wyjątkowych umiejętności diagnostycznych i kompleksowych planów leczenia, oferujący nadzieję i ulgę pacjentom złożonymi schorzeniami neurologicznymi.',
    },
    {
      id: 6,
      firstName: 'John',
      lastName: 'Doe',
      imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
      description: 'Wykwalifikowany ortopeda specjalizujący się w medycynie sportowej, ceniony za innowacyjne techniki i zaangażowanie w pomaganie sportowcom w powrocie do pełnej sprawności i wydajności.',
    },
    {
      id: 7,
      firstName: 'Michael',
      lastName: 'Johnson',
      imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
      description: ' Doświadczony chirurg plastyczny o niezrównanej precyzji i wrażliwości, pomagający pacjentom odzyskać pewność siebie poprzez dostarczanie naturalnych i harmonijnych rezultatów estetycznych.',
    },
    {
      id: 8,
      firstName: 'Robert',
      lastName: 'Anderson',
      imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
      description: ' Uznany kardiolog z ogromnym doświadczeniem w interwencjach kardiologicznych, łączący najnowocześniejszą technologię z indywidualną opieką, aby poprawić zdrowie serca i ratować życie.',
    },
  ];
  
  return (
    <div id="homepage">
      {doctorList.map((doctor, index) => (
        <div key={index}>
          <div className='doctor_card'>
            <div className='column1'>
              <img src={doctor.imageSource} alt={`${doctor.firstName} ${doctor.lastName}`} />
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