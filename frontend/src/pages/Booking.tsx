import { useParams } from "react-router-dom"
import '../styles/Booking.scss'

function Booking() {
    const { id } = useParams()
    
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
      {
        id: 3,
        firstName: 'Robert',
        lastName: 'Anderson',
        email: 'robert.anderson@gmail.com',
        imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
        description: ' Uznany kardiolog z ogromnym doświadczeniem w interwencjach kardiologicznych, łączący najnowocześniejszą technologię z indywidualną opieką, aby poprawić zdrowie serca i ratować życie.',
      },
      {
        id: 4,
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@gmail.com',
        imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
        description: 'Genialny neurolog znany ze swoich wyjątkowych umiejętności diagnostycznych i kompleksowych planów leczenia, oferujący nadzieję i ulgę pacjentom złożonymi schorzeniami neurologicznymi.',
      },
      {
        id: 5,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
        description: 'Wykwalifikowany ortopeda specjalizujący się w medycynie sportowej, ceniony za innowacyjne techniki i zaangażowanie w pomaganie sportowcom w powrocie do pełnej sprawności i wydajności.',
      },
      {
        id: 6,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@gmail.com',
        imageSource: 'https://thumbs.dreamstime.com/b/doctor-showing-square-tablet-senior-holding-looking-shaped-pill-his-office-66241636.jpg',
        description: ' Doświadczony chirurg plastyczny o niezrównanej precyzji i wrażliwości, pomagający pacjentom odzyskać pewność siebie poprzez dostarczanie naturalnych i harmonijnych rezultatów estetycznych.',
      },
      {
        id: 7,
        firstName: 'Robert',
        lastName: 'Anderson',
        email: 'robert.anderson@gmail.com',
        imageSource: 'https://cdn.create.vista.com/api/media/small/417834110/stock-photo-close-up-of-medical-practitioner',
        description: ' Uznany kardiolog z ogromnym doświadczeniem w interwencjach kardiologicznych, łączący najnowocześniejszą technologię z indywidualną opieką, aby poprawić zdrowie serca i ratować życie.',
      },
    ];

    const doctorId = parseInt(id ?? "");
    const doctor = doctorList[doctorId];

    const currentDate = new Date();
    const currentDateTimeString = currentDate.toLocaleString();
    // console.log(currentDateTimeString.split(',')[0])
    // console.log(currentDate.getDay());

    function getWorkingWeekDays() {
      let dayNumber = currentDate.getDay();
      switch (dayNumber) {
        case 0:
          return ['PN', 'WT', 'ŚR', 'CZ', 'PT']
        case 1:
          return ['PN', 'WT', 'ŚR', 'CZ', 'PT']
        case 2:
          return ['WT', 'ŚR', 'CZ', 'PT', 'PN']
        case 3:
          return ['ŚR', 'CZ', 'PT', 'PN', 'WT']
        case 4:
          return ['CZ', 'PT', 'PN', 'WT', 'ŚR']
        case 5:
          return ['PT', 'PN', 'WT', 'ŚR', 'CZW']
        default:
          return ['PN', 'WT', 'ŚR', 'CZ', 'PT']
    }
  }

  function getNextWorkingDates() {
    const workingDays = [];
    let currentDate = new Date();
  
    while (workingDays.length < 5) {
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
  
      // Check if it's a working day (Monday to Friday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDays.push(new Date(currentDate));
      }
    }
  
    return workingDays.toLocaleString();
  }
    
  
  const workingDates = getNextWorkingDates();
  console.log(workingDates);
  

  return (
    <div id="booking_page">
      <div className="doctor_card">
        <img src={doctor.imageSource} alt={`${doctor.firstName} ${doctor.lastName}`} />
        <h1>dr {doctor.firstName}</h1>
        <h1 className="lastName"> {doctor.lastName}</h1>
        <span>{doctor.description}</span>
        <div className="info_button">
          <h2>E-MAIL:</h2>
          <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
        </div>
        <div className="info_button">
          <h2>TELEFON:</h2>
          <a href="tel:+48111222333">+48 111 222 333</a>
        </div>
      </div>
      <div className="calendar">
        {getWorkingWeekDays().map((day, index) => (
          <div key={index} className="weekday_column">
            <h4>{day}</h4>
            <h5>{workingDates.split(',')[index*2]}</h5>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Booking