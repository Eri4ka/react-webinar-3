import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, translations}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
        <span className={cn('label')}>{translations['BasketTool.label']}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} 
               ${plural(amount, 
                {
                  one: translations['PluralItem.one'], 
                  few: translations['PluralItem.few'], 
                  many: translations['PluralItem.many']
                }
                )} / ${numberFormat(sum, translations['PriceLocale'])} ₽`
            : `${translations['BasketTool.empty']}`
          }
        </span>
        <button onClick={onOpen}>{translations['BasketTool.button']}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translations: PropTypes.object
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
