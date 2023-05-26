import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import useSelector from "../../store/use-selector";
import './style.css';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');

  const select = useSelector(state => ({
    translation: state.localization.translations
  }));

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{select.translation['BasketTotal.total']}</span>
      <span className={cn('cell')}> {numberFormat(sum, select.translation['PriceLocale'])} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
