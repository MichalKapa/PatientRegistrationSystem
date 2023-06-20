import "../styles/MyReservations.scss"

function MyReservations() {

    interface Reservation {
        reservationId: number,
        doctorId: number,
        doctorLastName: string,
        doctorFirstName: string,
        patientId: number,
        dateTime: Date,
    }
    
      const reservationList: Reservation[] = [
        {
            reservationId: 1,
            doctorId: 1,
            doctorLastName: "Kowalski",
            doctorFirstName: "Jan",
            patientId: 1,
            dateTime: new Date(),
        },
        {
            reservationId: 2,
            doctorId: 1,
            doctorLastName: "Błaszczykowski",
            doctorFirstName: "Sebastian",
            patientId: 1,
            dateTime: new Date(),
        },
    ]

    function getDateLabel(currentDate: Date) {
        const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const time = currentDate.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
        const formattedDate = `${dayOfWeek} ${time} - ${currentDate.toLocaleDateString("pl-PL")}`;
        return formattedDate
    }



  return (
    <div id='reservations_page'>
        <h1 className='main_text'>MOJE WIZYTY</h1>
        <div className='reservations_list'>
            {reservationList.map((reservation, index) => (
            <>
                <div className="reservation_wrapper">
                    <div className='reservation_info' key={index}>
                        <div className='tab1'>
                            <h1>{reservation.doctorLastName + " " + reservation.doctorFirstName}</h1>
                        </div>
                        <div className='tab2'>
                            <h1>{getDateLabel(reservation.dateTime)}</h1>
                        </div>
                    </div>
                    <div className="option_column">
                        <button className="buttons red_button">ODWOŁAJ WIZYTĘ</button>
                    </div>
                </div>
            </>
            ))}
        </div>
    </div>
  )
}

export default MyReservations