import Footer from '../../cmps/Footer/Footer';
import Header from '../../cmps/Header/Header';
import UsersList from '../../cmps/User/UsersList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='home-page-container'>
      <div className='home-page--header'>
        <Header />
      </div>
      <div className='home-page--body'>
        <UsersList />
      </div>
      <div className='home-page--footer'>
        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
