import "../styles/Header.scss";
import { useLocation } from 'react-router-dom';
import HeaderButton from "./HeaderButton";

const Header = () => {
    const user: string = 'g'
    const location = useLocation();

    switch(user) {
        case 'p': {
            return (
            <nav id='header'>
                
            </nav>
            )}
        case 'd': {
            return (
            <nav id='header'>
               
            </nav>
            )}
        default: {
            return (
            <nav id='header'>
                <ul>
                    <li>
                        <HeaderButton text={"STRONA GłÓWNA"} primaryColor={"black"} secondaryColor={"white"} link={"/"} />
                    </li>
                    <li>
                        <HeaderButton text={"KONTAKT"} primaryColor={"black"} secondaryColor={"white"} link={"/contact"} />
                    </li>
                    <li>
                        <HeaderButton text={"REJESTRACJA"} primaryColor={"#609C30"} secondaryColor={"white"} link={"/register"} />
                    </li>
                    <li>
                        <HeaderButton text={"LOGOWANIE"} primaryColor={"#609C30"} secondaryColor={"white"} link={"/login"} />
                    </li>
                </ul>
            </nav>
            )}
    }
}

export default Header