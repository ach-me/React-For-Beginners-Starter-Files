import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  // cuando dentro de render() empieza a estar muy cargado, mejor separarlo en funciones propias
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    // asegurarse de que fish este cargado antes de continuar
    if (!fish) return null;

    // chequear que este disponible
    if (!isAvailable) {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available</li>;
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    );
  };

  render() {
    // crear un array con el id de las ordenes
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(key => this.renderOrder(key))}</ul>
        <div className="total">
          Total
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
