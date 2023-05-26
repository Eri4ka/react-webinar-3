import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum, translations}) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations['BasketTotal.total']}</span>
      <span className={cn('cell')}> {numberFormat(sum, translations['PriceLocale'])} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  translations: PropTypes.object
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
