import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './SotrePicker';
import App from './App';
import NotFound from './NotFound';

// stateless functional component
// (cuando el componente solo retorna html) no hace falta declararlo como clase
const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* Aqui van todos los ruteos. Las rutas se van intentando secuencialmente de arriba hacia abajo */}
      <Route exact path="/" component={StorePicker}/>
      <Route path="/store/:storeId" component={App}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)

export default Router;