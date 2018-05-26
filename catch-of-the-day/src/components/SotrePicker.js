import React from 'react';

// cada componente creado sera una clase 
class StorePicker extends React.Component {
  // todas las clases necesitan al menos un metodo
  // ese metodo se llama "render()"
  // se encarga de volvar la estructura html 
  render() {
    return <p>Adentro de storepicker</p>
    // para que esto se muestre, primero hay que montar
    // la aplicacion con el paquete 'react-DOM'
  }
}

// para que el componente este disponible en la aplicacion
// hay que exportarlo como 'export default'
export default StorePicker;

