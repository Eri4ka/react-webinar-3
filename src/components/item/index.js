import React, {useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item({item, onClick, buttonTitle}){
  const cn = bem('Item');

  const callbacks = {
    onClick: () => {
      onClick(item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price.toLocaleString('ru-RU') + ' ₽'}</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.node
};

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);
