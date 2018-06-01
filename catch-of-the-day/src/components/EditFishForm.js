import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.string,
    }),
    index: PropTypes.string,
    updatedFish: PropTypes.func,
  };

  handleChange = e => {
    // update current fish
    const updatedFish = {
      ...this.props.fish, // Tomar una copia del fish actual
      [e.currentTarget.name]: e.currentTarget.value,
      // sobreescribir el campo que cambio. "Computed property name" de ES6
      // "e.currentTarget.name" devuelve el atributo "name" del elemento que disparo esta funcion. Entonces se usa ese valor como key del array
      // Ej: [name]: 'xyz'; asigna el string 'xyz' a la propiedad cuyo nombre es "name"
    };
    // Este cambio hay que llevarlo hasta el state dentro de "App.js"
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        {/* para poder editar los inputs es necesario agregar un evento onChange */}
        <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
        <input
          type="text"
          name="price"
          onChange={this.handleChange} // react va a prevenir que se modifique
          value={this.props.fish.price}
        />
        <select type="text" status="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
        <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
