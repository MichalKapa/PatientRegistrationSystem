import "../styles/DoctorReservation.scss"

function DoctorReservation() {

    interface TimeSlot {
        time: string;
        isPast: boolean;
        dayIndex: number;
      }

    const currentDate = new Date();
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

    const generateTimeColumn = (date: string, dayIndex: number): JSX.Element => {    
        const generateTimeSlots = (): TimeSlot[] => {
          const startTime = new Date();
          startTime.setHours(8, 0, 0);
          const endTime = new Date();
          endTime.setHours(17, 30, 0);
          const actualTime = new Date()
  
          const timeSlots: TimeSlot[] = [];
          let currentTime = new Date(startTime);
      
          while (currentTime <= endTime) {
            let formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
            let isPast = false
            if (dayIndex == 0) {
              isPast = formattedTime < actualTime.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });
            }
  
            timeSlots.push({ time: formattedTime, isPast, dayIndex });
      
            currentTime.setMinutes(currentTime.getMinutes() + 30);
          }
      
          return timeSlots;
        };
      
        const timeSlots = generateTimeSlots();
      
        return (
          <div className="hour_column">
            <ul>
              {timeSlots.map((slot, index) => (
                <li key={index}>
                  <h6 onClick={() => showPatient()} className={`prevent_select ${slot.isPast ? 'past' : ''}`} id={date + index}>{slot.time}</h6>
                </li>
              ))}
            </ul>
          </div>
        );
      };

    function getNextWorkingDates() {
    const workingDays = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    
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

    function showPatient() {
        alert("show patient with id {id}")
    }

    return (
        <div id="doctor_reservation_page" className="reservation_page">
            <h1 className="main_text">KALENDARZ WIZYT</h1>
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

export default DoctorReservation