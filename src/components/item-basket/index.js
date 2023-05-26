import {memo, useCallback} from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} to={props.path}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price, props.translations['PriceLocale'])} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0, props.translations['PriceLocale'])} {props.translations['Unit.pc']}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translations['Button.remove']}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  path: PropTypes.string,
  onRemove: propTypes.func,
  translations: PropTypes.object
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
