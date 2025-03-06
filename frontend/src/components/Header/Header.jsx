import logo from '/src/assets/logo.png';
import SearchBox from '/src/components/SearchBox/SearchBox';
import './Header.scss';
import BoxMessage from '/src/components/BoxMessage/BoxMessage';

export default function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <a href='/' className='header__logo-link'>
          <img src={logo} alt='Mercado Libre' className='header__logo' />
        </a>
        <SearchBox />
        <BoxMessage />
      </div>
    </header>
  );
}
