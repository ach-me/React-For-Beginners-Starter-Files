import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  // funcion que actualiza los state
  // debe estar declarada en el mismo componente donde se declaro el state
  addFish = (fish) => {
    // actualizar state
    // tomar una copia del state existente
    const fishes = {...this.state.fishes};
    // agregar nuevo fish a fishes
    fishes[`fish${Date.now()}`] = fish;
    // actualizar el estado deseado. no es necesario actualizar todas las propiedades de "state"
    this.setState({
      fishes,
    })
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        {/* Props son como atributos en html que se usan para que el dato este accesible en el componente.

        Los componentes son objetos. "props" es una propiedad del componente, que a su vez es otro objeto, que contiene como propiedades todos los "atributos" que se hayan definido aca  */}
          <Header tagline="Fresh seafood market" />
        </div>
        <Order />
        {/* para que un metodo o propiedad exista en otro componente, se lo transmite como "atributo" */}
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;