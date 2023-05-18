import { useParams } from "react-router-dom"

function Booking() {
    const { id } = useParams()
    
  return (
    <div>Booking {id}</div>
  )
}

export default Booking