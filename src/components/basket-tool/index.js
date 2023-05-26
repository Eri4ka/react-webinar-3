import {memo} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import useSelector from "../../store/use-selector";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const select = useSelector(state => ({
    translation: state.localization.translations
  }));

  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>{select.translation['BasketTool.title']}</Link>
      <div>
        <span className={cn('label')}>{select.translation['BasketTool.label']}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} 
               ${plural(amount, 
                {
                  one: select.translation['PluralItem.one'], 
                  few: select.translation['PluralItem.few'], 
                  many: select.translation['PluralItem.many']
                }
                )} / ${numberFormat(sum, select.translation['PriceLocale'])} ₽`
            : `${select.translation['BasketTool.empty']}`
          }
        </span>
        <button onClick={onOpen}>{select.translation['BasketTool.button']}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
