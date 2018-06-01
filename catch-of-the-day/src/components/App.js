import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    fishes: {},
    order: {},
  };

  /**
   * Life cycle method
   * Replica state.fishes a firebase
   */
  componentDidMount() {
    // cuando se carga (monta) el compoonente, se actualiza el state, que a su ejecuta "componentDidUpdate"

    const { params } = this.props.match;

    // para que se mantenga los datos de localstorage al actualizar la pagina
    // hay que reasignar el "order" en localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // "ref" en firebase es una referencia a una parte de datos de la base
    // referencia al nombre del store y al objeto con todos los fishes
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    // cada vez que se actualiza el componente se ejectuta esto
    // guardar la orden de ese store especifico en localstorage
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  // Para que no se guarden indefinidamente stores nuevos en firebase cada vez que el usuario navega a la pantalla principal
  componentWillUnmount() {
    // remover el link con la base de datos
    base.removeBinding(this.ref);
  }

  /**
   * funcion que actualiza los state
   * debe estar declarada en el mismo componente donde se declaro el state
   * * Informacion importante
   * ! prueba de extension de comentarios de vscode
   * ? salsakdjaslkdj
   * TODO: reasdjalsk
   * @param fish objeto { name,  price, status, desc, image }
   */

  addFish = fish => {
    // actualizar state
    // tomar una copia del state existente
    const fishes = { ...this.state.fishes };
    // agregar nuevo fish a fishes
    fishes[`fish${Date.now()}`] = fish;
    // actualizar el estado deseado. no es necesario actualizar todas las propiedades de "state"
    this.setState({
      fishes,
    });
  };

  /**
   *
   * @param key fish que sera actualizado
   * @param updatedFish fish con los datos actualizados
   */

  updateFish = (key, updatedFish) => {
    // Copiar state actual
    const fishes = { ...this.state.fishes };
    // actualizar el state.fish que fue modificado
    fishes[key] = updatedFish;
    // actualizar el state.fishes
    this.setState({ fishes });
  };

  deleteFish = key => {
    // hacer una copia de state
    const fishes = { ...this.state.fishes };
    // si fuera una array
    // this.state.fishes.filter()

    // actualizar estados
    // primero hay que setear el fish que se eliminará como "null"
    // porque firebase necesita que asi sea para poder removerlo de su base
    fishes[key] = null;

    // actualizar state
    this.setState({ fishes });
  };

  /**
   * Actualiza el "state.fishes"
   * @argument void
   */
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  /**
   * Actualiza el "state.order"
   * @param key string, propiedad del objeto fishes que representa cada fish
   */
  addToOrder = key => {
    // tomar una copia de "order"
    const order = { ...this.state.order };
    // Agregar a la orden o actualizar el numero si ya existe ese fish
    // si order[key] existe quiere decir que tiene que actualizar su cantidad, sino lo agrega a la lista
    order[key] = order[key] + 1 || 1;
    // actualizar la propiedad order
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    // como en este caso no se esta replicando a firebase, se puede hacer de
    // la siguiente manera
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          {/* Props son como atributos en html que se usan para que el dato este accesible en el componente.

        Los componentes son objetos. "props" es una propiedad del componente, que a su vez es otro objeto, que contiene como propiedades todos los "atributos" que se hayan definido aca  */}
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {/* hay que loopear por todo los elementos con javascript */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        {/* pasar todo el objeto "state" se puede con object spread: "{...this.state}", pero si se le agregan propiedades a "state" se enviaran aunque no sean necesarias */}
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        {/* para que un metodo o propiedad exista en otro componente, se lo transmite como "atributo" */}
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
