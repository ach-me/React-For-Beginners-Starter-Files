import React from 'react';

// cuando el componente solo retorna una estructura html
// se puede definir de la siguiente manera:
const Header = ( {tagline} ) => (
  // recibe los parametros desectructurando el objeto "props"
  // de la manera habitual, el parametro seria "props"
  // y la referencia a la variable seria "props.tagline"
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
    {/* cuando se quiere usar una variable dentro de JSX, se pasan entre {}.
  Los corchetes indican que se va a escribir javascript, necesario para poder acceder a las variables.
  "this" es esta clase,
  "props" es la propiedad que contiene todas las propiedades definidas
  "tagline" es el nombre de una propiedad*/}
      <span>{tagline}</span>
    </h3>
  </header>
);

// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">Of</span>
//             <span className="the">The</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//         {/* cuando se quiere usar una variable dentro de JSX, se pasan entre {}.
//       Los corchetes indican que se va a escribir javascript, necesario para poder acceder a las variables.
//       "this" es esta clase,
//       "props" es la propiedad que contiene todas las propiedades definidas
//       "tagline" es el nombre de una propiedad*/}
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     )
//   }
// }

export default Header;