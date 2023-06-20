import "../styles/AdminDoctorList.scss"

function AdminDoctorList() {

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

    function onDelete() {
        alert("delete")
    }

  return (
    <div id="admin_doctor_list_page">
        <div className="header">
            <h1 className="main_text">LISTA LEKARZY</h1>
            <a href={"/doctor/add"} className='add'>DODAJ</a>
        </div>
        {doctorList.map((doctor, index) => (
            <div key={index} className="doctor_wrapper">
                <div className="name">
                    <h2>{doctor.lastName}</h2>
                </div>
                <div className="name">
                    <h2>{doctor.firstName}</h2>
                </div>
                <div className="email">
                    <h2>{doctor.email}</h2>
                </div>
                <a href={`/doctor/edit/${doctor.id}`} className='edit'>EDYCJA</a>
                <button onClick={() => onDelete()} className="delete">USUŃ</button>
            </div>
        ))}
        
    </div>
  )
}

export default AdminDoctorList