import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    storeId: PropTypes.string.isRequired,
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    // cada vez que se cargue la pagina, firebase verificara si esta logueado,
    // si es verdadero retorna el usuario
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // Verificar si el usuario posee el store actual
    // 1. Ver actual store en firebase
    // { context: this } brinda informacion de como es la mejor manera de hacer el fetch
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Si no tiene propietario, asignarselo
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid, // valor unico por usuario que guardara en la carpeta "owner" del store en firebase
      });
    }
    // 3. Actualizar el state del componente Inventory
    // cuando algunos datos no son necesarios fuera de un componente, se crea un setState local
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid, // el owner sera el propietario (si existe) o el que acaba de ser asignado
    });
  };

  authenticate = provider => {
    // Establecer el Auth provider
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    // retornar la conexion de la auth de firebase
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('Saliendo...');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;
    // verificar si no esta logeado
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // verificar si no es propietario del store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner</p>
          {logout}
        </div>
      );
    }

    // Es el propietario. Mostrar el inventario
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        {/* para que este disponible en AddFishForm */}
        <AddFishForm addFish={this.props.addFish} />

        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
