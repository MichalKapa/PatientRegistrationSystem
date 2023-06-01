import { useState } from "react";
import { useParams } from "react-router-dom"
import '../styles/Booking.scss'

function Booking() {
    const { id } = useParams()
    
    const handleClick = (index: number, date: string, dayIndex: number) => {
      // hourClicked(index, date);
      displayConfirmation(index, date, dayIndex)
    };

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

    interface TimeSlot {
      time: string;
      isPast: boolean;
      dayIndex: number;
    }

    const hourArray = [
      "8:00",
      "8:30",
      "9:00",
      "9:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ]

    type MyDictionary = Record<string, string>;

    const daysDict: MyDictionary = {
      "PN": "PONIEDZIAŁEK",
      "WT": "WTOREK",
      "ŚR": "ŚRODA",
      "CZ": "CZWARTEK",
      "PT": "PIĄTEK",
    }

    const generateTimeColumn = (date: string, dayIndex: number): JSX.Element => {    
      const generateTimeSlots = (): TimeSlot[] => {
        const startTime = new Date();
        startTime.setHours(8, 0, 0); // Set the start time to 8:00 AM
        const endTime = new Date();
        endTime.setHours(17, 30, 0); // Set the end time to 5:30 PM
    
        const timeSlots: TimeSlot[] = [];
        let currentTime = new Date(startTime);
    
        while (currentTime <= endTime) {
          const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const isPast = formattedTime < currentTime.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });
    
          timeSlots.push({ time: formattedTime, isPast, dayIndex });
    
          currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes
        }
    
        return timeSlots;
      };
    
      const timeSlots = generateTimeSlots();
    
      return (
        <div className="hour_column">
          <ul>
            {timeSlots.map((slot, index) => (
              <li key={index} className={slot.isPast ? 'past' : ''}>
                <h6 className="prevent_select" id={date + index} onClick={() => handleClick(index, date, slot.dayIndex)}>{slot.time}</h6>
              </li>
            ))}
          </ul>
        </div>
      );
    };

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

  // let prevHourClicked = ""

  // function hourClicked(index: number, date: string) {
  //   if (prevHourClicked != "") {
  //     document.getElementById(prevHourClicked)?.classList.remove("selected")
  //   }
  //   prevHourClicked = date + index
  //   document.getElementById(prevHourClicked)!.classList.add("selected")
  // }
  
  function displayConfirmation(index: number, date: string, dayIndex: number) {
    document.getElementById("confirmation")!.style.display = "block"
    document.getElementById("calendar")!.style.display = "none"
    
    document.getElementById("datetime")!.innerHTML = daysDict[date.split(".")[0]] + " " + hourArray[index] + " - " + getNextWorkingDates().split(", ")[0]
  }

  function hideConfirmation() {
    document.getElementById("confirmation")!.style.display = "none"
    document.getElementById("calendar")!.style.display = "flex"
  }

  function acceptClick() {
    //add reservation
    window.location.href = "/"
  }
  
  function cancelClick() {
    hideConfirmation()
  }

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
      <div id="confirmation" className="confirmation">
        <h1 className="choice_text">Wybrany dzień i godzina:</h1>
        <div className="datetime_div">
          <h2 id="datetime">Piątek 12:00 - 05.05.2023</h2>
        </div>
        <div className="buttons_div">
          <button onClick={() => cancelClick()} className="buttons accept_button cancel_button">Anuluj</button>
          <button onClick={() => acceptClick()} className="buttons accept_button">Zatwierdź</button>
        </div>
      </div>
      <div id="calendar" className="calendar">
        {getWorkingWeekDays().map((day, index) => (
          <div key={index} className="weekday_column">
            <h4>{day}</h4>
            <h5>{workingDates.split(',')[index*2]}</h5>
              {generateTimeColumn(day, index)}
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Booking