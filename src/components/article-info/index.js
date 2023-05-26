import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat, sliceText } from "../../utils";
import { MAX_DESCRIPTION_LENGTH } from "../../constants";
import './style.css';

function ArticleInfo(props){

  const cn = bem('ArticleInfo');

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
          {props.translations['Article.country']}{' '}
          <strong>{props.article?.madeIn?.title} ({props.article?.madeIn?.code})</strong>
        </div>
        <div className={cn('property')}>
          {props.translations['Article.category']}{' '}
          <strong>{props.article?.category?.title}</strong>
        </div>
        <div className={cn('property')}>
          {props.translations['Article.year']}{' '}
          <strong>{props.article?.edition}</strong>
        </div>
        <div className={cn('price')}>
          {props.translations['Article.price']}
          <span>{numberFormat(props.article?.price, props.translations['PriceLocale'])} ₽</span>
        </div>
        <div className={cn('actions')}>
          <button onClick={callbacks.onAdd}>{props.translations['Button.add']}</button>
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
  translations: PropTypes.object
};

ArticleInfo.defaultProps = {
  onAdd: () => {},
}

export default memo(ArticleInfo);
