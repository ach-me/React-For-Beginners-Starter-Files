import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  // life cycle method
  // para replicar el estado de "fishes" a firebase
  componentDidMount() {
    const { params } = this.props.match;
    // "ref" en firebase es una referencia a una parte de datos de la base
    // referencia al nombre del store y al objeto con todos los fishes
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  // Para que no se guarden indefinidamente stores nuevos cada vez que el usuario navega a la pantalla principal
  componentWillUnmount() {
    // remover el link con la base de datos
    base.removeBinding(this.ref);
  }

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
  
  addToOrder = (key) => {
    // tomar una copia de "order"
    const order = {...this.state.order};
    // Agregar a la orden o actualizar el numero si ya existe ese fish
    // si order[key] existe quiere decir que tiene que actualizar su cantidad, sino lo agrega a la lista
    order[key] = order[key] + 1 || 1;
    // actualizar la propiedad order
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        {/* Props son como atributos en html que se usan para que el dato este accesible en el componente.

        Los componentes son objetos. "props" es una propiedad del componente, que a su vez es otro objeto, que contiene como propiedades todos los "atributos" que se hayan definido aca  */}
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {/* hay que loopear por todo los elementos con javascript */}
            {
              Object.keys(this.state.fishes).map(key  => (
                <Fish 
                  key={key}
                  index={key} 
                  details={this.state.fishes[key]} 
                  addToOrder={this.addToOrder}
                />)
              )
            }
          </ul>
        </div>
        {/* pasar todo el objeto "state" se puede con object spread: "{...this.state}", pero si se le agregan propiedades a "state" se enviaran aunque no sean necesarias*/}
        <Order fishes={this.state.fishes} order={this.state.order}/>
        {/* para que un metodo o propiedad exista en otro componente, se lo transmite como "atributo" */}
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;