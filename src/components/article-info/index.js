import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat, sliceText } from "../../utils";
import { MAX_DESCRIPTION_LENGTH } from "../../constants";
import useSelector from "../../store/use-selector";
import './style.css';

function ArticleInfo(props){

  const cn = bem('ArticleInfo');

  const select = useSelector(state => ({
    translation: state.localization.translations
  }));

  const callbacks = {
    onAdd: () => props.onAdd(props.article._id)
  }
  
  const slicedDecription = useMemo(() => {
    return sliceText(props.article?.description, MAX_DESCRIPTION_LENGTH);
  }, [props.article?.description]);

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('description')}>
          {slicedDecription}
        </div>
        <div className={cn('property')}>
          {select.translation['Article.country']}{' '}
          <strong>{props.article?.madeIn?.title} ({props.article?.madeIn?.code})</strong>
        </div>
        <div className={cn('property')}>
          {select.translation['Article.category']}{' '}
          <strong>{props.article?.category?.title}</strong>
        </div>
        <div className={cn('property')}>
          {select.translation['Article.year']}{' '}
          <strong>{props.article?.edition}</strong>
        </div>
        <div className={cn('price')}>
          {select.translation['Article.price']}
          <span>{numberFormat(props.article?.price, select.translation['PriceLocale'])} ₽</span>
        </div>
        <div className={cn('actions')}>
          <button onClick={callbacks.onAdd}>{select.translation['Button.add']}</button>
        </div>
      </div>
    </div>
  );
}

ArticleInfo.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
}

export default memo(ArticleInfo);
