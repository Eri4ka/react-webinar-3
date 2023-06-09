import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout(props) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.title} ({props.total})</div>
      {props.children}
    </div>
  );
}

CommentsLayout.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number,
  children: PropTypes.node
};

CommentsLayout.defaultProps = {
  title: 'Комментарии',
  total: 0
}

export default CommentsLayout;
