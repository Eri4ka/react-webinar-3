import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../../../utils';
import './style.css';

function BasketCount({ count, sum }) {
  return (
      <div className='BasketCount'>
        {count}{' '}
        {plural(count, {one: 'товар', few: 'товара', many: 'товаров'})}{' '} 
        {count > 0 && `/ ${sum} ₽`}
      </div>
    )
}

BasketCount.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
};

export default BasketCount;