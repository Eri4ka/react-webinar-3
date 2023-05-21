import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Controls from "../controls";
import BasketCount from '../basket-count';
import './style.css';


function Basket({ count, sum, onToggleModal }) {
  const cn = bem('Basket');

  return (
    <div className={cn()}>
      <div className={cn('text')}>В корзине:</div>
      <BasketCount count={count} sum={sum} />
      <Controls onClick={onToggleModal} title='Перейти' />
    </div>
  )
}

Basket.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  onToggleModal: PropTypes.func
};

export default Basket;