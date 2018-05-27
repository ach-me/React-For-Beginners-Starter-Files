import React from 'react';
// export default
// pordria importarse solo la clase componente
// en lugar de toda la libreria:
// import { Component } from 'react'
// en este caso, al extender la clase seria:
// class StorePicker extends Component {}

import { render } from 'react-dom';
// en este caso solo importa el metodo "render" del paquete
// react-dom
// {named export}, es necesario saber el nombre

// import StorePicker from '../src/components/SotrePicker';
// import App from '../src/components/App';
import Router from '../src/components/Router';

// importar los estilos para que esten disponibles en toda
// la aplicacion
import './css/style.css';

// render(expresion JSX (html), elemento dom para montar)
render(<Router />, document.querySelector('#main'));
