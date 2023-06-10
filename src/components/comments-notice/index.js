import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsNotice(props) {
  const cn = bem('CommentsNotice');

  return (
    <div className={cn()} ref={props.innerRef}>
      <Link {...props.link}>{props.linkText}</Link>
      , {props.additionalText[props['type']]}{' '}
      {props.type === 'comment' && 
        <span className={cn('cancel')} onClick={props.onResetActiveType}>{props.cancelText}</span>
      }
    </div>
  );
}

CommentsNotice.propTypes = {
  additionalText: PropTypes.shape({
    comment: PropTypes.string,
    article: PropTypes.string
  }).isRequired,
  link: PropTypes.object.isRequired,
  additionalText: PropTypes.shape({
    comment: PropTypes.string,
    article: PropTypes.string
  }).isRequired,
  linkText: PropTypes.string,
  cancelText: PropTypes.string,
  onResetActiveType: PropTypes.func
};

CommentsNotice.defaultProps = {
  linkText: 'Войдите',
  cancelText: 'Отмена',
  onResetActiveType: () => {}
}

export default CommentsNotice;
