import '../styles/Base.scss'
import '../styles/Contact.scss'

function Contact() {
  return (
    <div id='contact_page'>
      <h1 className='main_text'>DANE KONTAKTOWE</h1>
      <div className='info_box'>
        <h1>TELEFON:</h1>
        <h2>+48 111 222 333</h2>
        <h1>ADRES MAILOWY:</h1>
        <h2>WROCŁAWSKA@GMAIL.COM</h2>
        <h1>ADRES:</h1>
        <h2>UL. WROCŁAWSKA 12,</h2>
        <h2>51-300 WROCŁAW</h2>
      </div>
    </div>
  )
}

export default Contact