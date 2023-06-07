import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Terms from './pages/Terms';
import {Routes, Route} from "react-router-dom";
import "./styles/Base.scss"

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login/:role" element={<Login/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/reservation/:id" element={<Reservation/>} />
        <Route path="/terms" element={<Terms/>} />
      </Routes>
    </div>
  );
}

export default App;
