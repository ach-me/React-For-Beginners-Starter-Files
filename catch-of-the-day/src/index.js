import React from 'react';
// pordria importarse solo la clase componente
// en lugar de toda la libreria:
// import { Component } from 'react'
// en este caso, al extender la clase seria:
// class StorePicker extends Component {}

import { render } from 'react-dom';
// en este caso solo importa el metodo "render" del paquete
// react-dom

import StorePicker from '../src/components/SotrePicker';

// importar los estilos para que esten disponibles en toda
// la aplicacion
import './css/style.css';

// render(expresion JSX (html), elemento dom para montar)
render(<StorePicker />, document.querySelector('#main'));
