import React, {useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function BasketItem({item, onClick, buttonTitle}){
  const cn = bem('BasketItem');

  const callbacks = {
    onClick: () => {
      onClick(item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('field')}>{item.price.toLocaleString('ru-RU') + ' ₽'}</div>
      <div className={cn('field')}>{item.count} шт</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.node
};

BasketItem.defaultProps = {
  onClick: () => {},
}

export default React.memo(BasketItem);
