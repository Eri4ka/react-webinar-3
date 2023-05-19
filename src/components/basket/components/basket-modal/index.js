import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Modal from '../../../modal';
import List from '../../../list';

import './style.css';


function BasketModal({ basket, sum, onClose, onDelete }) {
  const cn = bem('BasketModal');

  return (
    <Modal title='Корзина' onClose={onClose}>
      <div className={cn('indent')} />
      <List list={basket} buttonItemTitle='Удалить' onItemClick={onDelete} />
      <div className={cn('summary')}>
        <div className={cn('summary__text')}>Итого</div>
        <div className={cn('summary__text')}>{sum} ₽</div>
      </div>
      <div className='BasketModal-indent' />
    </Modal >
  )
}

Modal.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })),
  sum: PropTypes.number,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
  onDelete: () => {},
};

export default BasketModal;