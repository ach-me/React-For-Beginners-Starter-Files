import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

// cada componente creado sera una clase
class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  // un "ref" permite referenciar un DOM Node
  myInput = React.createRef();

  goToStore = e => {
    // 1. stop the form for submitting
    e.preventDefault();
    // 2. get the text from input
    const storeName = this.myInput.value.value;
    // 3. change the page whitout re loading it
    // al ser este un componente hijo de Router, tiene acceso a todas sus propiedades.
    this.props.history.push(`/store/${storeName}`);
  };
  // todas las clases necesitan al menos un metodo
  // ese metodo se llama "render()"
  // se encarga de volvar la estructura html
  render() {
    return (
      // los parentesis son necesarios
      // cuando se quiere escribir html en varias lineas

      // solo se puede retornar un elemento html.
      // esto no es posible:
      // <h2></h2>
      // <form action=""></form>

      // Una forma de solucionarlo es meter toda la
      // estructura dentro de:
      // <React.Fragment>
      // </React.Fragment>

      <Fragment>
        {/* <p>Fish!</p> */}
        <form className="store-selector" onSubmit={this.goToStore}>
          {/* comentario dentro de JSX */}
          <h2>Please Enter a Store</h2>

          <input
            type="text"
            required="required"
            placeholder="Store Name"
            defaultValue={getFunName()}
            ref={this.myInput}
          />
          <button type="submit">Visit Store</button>
        </form>
      </Fragment>
    );
    // para que esto se muestre, primero hay que montar
    // la aplicacion con el paquete 'react-DOM'
  }
}

// para que el componente este disponible en la aplicacion
// hay que exportarlo como 'export default'
export default StorePicker;
