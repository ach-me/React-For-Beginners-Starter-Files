import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        {/* Props son como atributos en html que se usan para que el dato este accesible en el componente.
        
        Los componentes son objetos. "props" es una propiedad del componente, que a su vez es otro objeto, que contiene como propiedades todos los "atributos" que se hayan definido aca  */}
          <Header tagline="Fresh seafood market" />
        </div>
        <Inventory />
        <Order />
      </div>
    )
  }
}

export default App;