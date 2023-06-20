import { ChangeEvent, useState } from 'react';
import '../styles/NewData.scss'

function NewData() {

  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [systolicPressure, setSystolicPressure] = useState('');
  const [diastolicPressure, setDiastolicPressure] = useState('');

  const weightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const weight = event.target.value;
    const sanitizedValue = sanitizeInput(weight, 3);

    setWeight(sanitizedValue);
  };

  const temperatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const weight = event.target.value;
    const sanitizedValue = sanitizeInput(weight, 2);

    setTemperature(sanitizedValue);
  };

  const systolicPressureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, ''); // Remove non-digit characters

    if (numericValue.length <= 3) {
      setSystolicPressure(numericValue);
    }
  };

  const diastolicPressureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 3) {
      setDiastolicPressure(numericValue);
    }
  };

  const sanitizeInput = (input: string, length: number) => {
    // Remove non-digit characters except dot (.) or comma (,)
    const numericValue = input.replace(/[^0-9.,]/g, '');

    // Split the number by dot (.) or comma (,)
    const parts = numericValue.split(/[.,]/);

    // Limit the whole number part to {length} digits
    const wholeNumber = parts[0].slice(0, length);

    // Combine the whole number part with the decimal part
    let sanitizedValue = wholeNumber;
    if (parts.length > 1) {
      const decimalPart = parts[1].slice(0, 1);
      sanitizedValue += '.' + decimalPart;
    }

    return sanitizedValue;
  };

  function cancelClick() {

  }

  function acceptClick() {

  }

  return (
    <div id='new_data_page'>
      <h1 className='main_text'>NOWE POMIARY</h1>
      <div className='form_container'>
        <div className='measurement'>  
          <h2>Waga:</h2>
          <input
            type="text"
            value={weight}
            onChange={weightChange}
            placeholder="xxx.x"
          />
          <h2 className='tag'>kg</h2>
        </div>
        
        <div className='measurement'> 
          <h2>Temperatura:</h2>
          <input
            type="text"
            value={temperature}
            onChange={temperatureChange}
            placeholder="xx.x"
          />
          <h2 className='tag'>℃</h2>
         </div> 
        
        <div className='measurement'> 
          <h2>Ciśnienie skurczowe:</h2>
          <input className='pressure_input'
            type="text"
            value={systolicPressure}
            onChange={systolicPressureChange}
            placeholder="xxx"
          />
          <h2 className='tag pressure_tag'>mmHg</h2>
         </div> 
        
        <div className='measurement'> 
          <h2>Ciśnienie rozkurczowe:</h2>
          <input className='pressure_input'
            type="text"
            value={diastolicPressure}
            onChange={diastolicPressureChange}
            placeholder="xxx"
          />
          <h2 className='tag pressure_tag'>mmHg</h2>
        </div>
      </div>
      <div className="buttons_div">
        <button onClick={() => cancelClick()} className="buttons accept_button cancel_button">Anuluj</button>
        <button onClick={() => acceptClick()} className="buttons accept_button">Zatwierdź</button>
      </div>
    </div>
  )
}

export default NewData