import { useLocation } from 'react-router-dom';

interface ButtonProps {
    text: string;
    primaryColor: string;
    secondaryColor: string;
    link: string;
}

const HeaderButton: React.FC<ButtonProps> = ({ text, primaryColor, secondaryColor, link }) => {
  const location = useLocation();

  const isActive = location.pathname === link;

  const buttonStyle = {
    backgroundColor: isActive ? secondaryColor : primaryColor,
    color: isActive ? primaryColor : secondaryColor,
    fontWeight: isActive ? 'bold' : 'normal',
  };

  return <a href={link} style={buttonStyle} className='buttons'>{text}</a>;
};

export default HeaderButton;