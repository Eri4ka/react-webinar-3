import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import transformDate from '../../utils/transform-date';
import './style.css';

function ItemComment(props) {
  const cn = bem('ItemComment');

  const callbacks = {
    onReply: () => {
      props.onReplyClick(props.comment._id);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('heading')}>
          <span className={cn('user')}>{props.comment.author.profile.name}</span>
          <span className={cn('date')}>{transformDate(props.comment.dateCreate)}</span>
        </div>
        <div className={cn('content', { deleted: props.comment.isDeleted })}>
          {props.comment.isDeleted ? props.deletedCommentText: props.comment.text}
        </div>
        <div className={cn('reply')} onClick={callbacks.onReply}>{props.replyText}</div>
      </div>
      {props.replyForm}
      {props.children.length > 0 && <div className={cn('nested')}>{props.children}</div>}
    </div>
  )
}

ItemComment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    isDeleted: PropTypes.bool
  }).isRequired,
  children: PropTypes.node,
  onReplyClick: PropTypes.func,
  replyForm: PropTypes.node,
  deletedCommentText: PropTypes.string,
  replyText: PropTypes.string
}

ItemComment.defaultProps = {
  onReplyClick: () => {},
  deletedCommentText: 'Комментарий удален',
  replyText: 'Ответить'
}

export default ItemComment;
