import "../styles/Header.scss";
import HeaderButton from "./HeaderButton";

const Header = () => {
    function handleLogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user_role");
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        console.log("wylogowano");
    }

    switch(localStorage.getItem("user_role")?.toLowerCase()) {
        case 'patient': {
            return (
            <nav id='header'>
                <ul>
                    <li>
                        <HeaderButton text={"STRONA GŁÓWNA"} primaryColor={"black"} secondaryColor={"white"} link={"/"} />
                    </li>
                    <li>
                        <HeaderButton text={"KONTAKT"} primaryColor={"black"} secondaryColor={"white"} link={"/contact"} />
                    </li>
                    <li>
                        <HeaderButton text={"MOJE DANE"} primaryColor={"black"} secondaryColor={"white"} link={"/my/data"} />
                    </li>
                    <li>
                        <HeaderButton text={"MOJE WIZYTY"} primaryColor={"black"} secondaryColor={"white"} link={"/my/reservations"} />
                    </li>
                    <li>
                        <a href={"/"} className='buttons logout_button' onClick={handleLogout}>WYLOGUJ</a>
                    </li>
                </ul>
            </nav>
            )}
        case 'doctor': {
            return (
            <nav id='header'>
               <ul>
                    <li>
                        <HeaderButton text={"STRONA GŁÓWNA"} primaryColor={"black"} secondaryColor={"white"} link={"/"} />
                    </li>
                    <li>
                        <HeaderButton text={"KONTAKT"} primaryColor={"black"} secondaryColor={"white"} link={"/contact"} />
                    </li>
                    <li>
                        <HeaderButton text={"KALENDARZ"} primaryColor={"black"} secondaryColor={"white"} link={"/doctor/calendar"} />
                    </li>
                    <li>
                        <a href={"/"} className='buttons logout_button' onClick={handleLogout}>WYLOGUJ</a>
                    </li>
               </ul>
            </nav>
            )}
        case 'admin': {
            return (
            <nav id='header'>
                <ul>
                    <li>
                        <HeaderButton text={"LISTA LEKARZY"} primaryColor={"black"} secondaryColor={"white"} link={"/show/doctors"} />
                    </li>
                    <li>
                        <a href={"/"} className='buttons logout_button' onClick={handleLogout}>WYLOGUJ</a>
                    </li>
                </ul>
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
                    {/* <li>
                        <HeaderButton text={"REJESTRACJA"} primaryColor={"#609C30"} secondaryColor={"white"} link={"/register"} />
                    </li> */}
                    <li>
                        <HeaderButton text={"LOGOWANIE"} primaryColor={"#609C30"} secondaryColor={"white"} link={"/login/patient"} />
                    </li>
                </ul>
            </nav>
            )}
    }
}

export default Header