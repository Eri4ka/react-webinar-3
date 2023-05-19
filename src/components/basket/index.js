import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import BasketModal from './components/basket-modal';
import Controls from "../controls";
import BasketCount from './components/basket-count';
import './style.css';


function Basket({ basket, onDeleteItem }) {
  const cn = bem('Basket');

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const sumInBasket = basket?.reduce((acc, i) => acc + i.price * i.count, 0);

  const callbacks = {
    onToggleModal: () => {
      setIsModalOpen((current) => !current);
    }
  };

  return (
    <>
    <div className={cn()}>
      <div className={cn('text')}>В корзине:</div>
      <BasketCount count={basket.length} sum={sumInBasket} />
      <Controls onClick={callbacks.onToggleModal} title='Перейти' />
    </div>
    {isModalOpen && (
      <BasketModal 
        basket={basket} 
        sum={sumInBasket} 
        onClose={callbacks.onToggleModal} 
        onDelete={onDeleteItem}
      />
    )}
    </>
  )
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func
};

export default Basket;