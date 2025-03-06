import { useState } from 'react';
import './BoxMessage.scss';

export default function SearchHelpMessage() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className='search-help-message'>
      <div className='search-help-message__header'>
        <strong>Hola</strong>
        <button
          className='search-help-message__close'
          onClick={() => setVisible(false)}
        >
          ✕
        </button>
      </div>
      <p>
        Para realizar búsquedas, solo debes ingresar el nombre de lo que
        necesites. Pueden ser productos, marcas y más...
      </p>
    </div>
  );
}
