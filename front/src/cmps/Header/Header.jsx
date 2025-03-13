import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import LogoIcon from '../../assets/icons/logo.png';
import { logout } from '../../services/auth.service';
import './Header.css';
const Header = () => {
  const navigate = useNavigate();

  const onLogout = async (e) => {
    console.log('onLogout');
    e.preventDefault();
    e.stopPropagation();
    await logout();
    navigate('/');
  };

  return (
    <header className='header-container'>
      <Image src={LogoIcon} size='mini' alt={'Logo'} />
      <p onClick={onLogout}>Logout</p>
    </header>
  );
};
export default Header;
