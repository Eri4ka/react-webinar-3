import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import transformDate from '../../utils/transform-date';
import './style.css';

function ItemComment(props) {
  const cn = bem('ItemComment');

  const isLimited = props.nesting > 20;

  const callbacks = {
    onReply: () => {
      props.onReplyClick(props.comment._id);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('heading')}>
          <span className={cn('user', { active: props.isActiveUser })}>{props.comment.author.profile.name}</span>
          <span className={cn('date')}>{transformDate(props.comment.dateCreate)}</span>
        </div>
        <div className={cn('content', { deleted: props.comment.isDeleted })}>
          {props.comment.isDeleted ? props.deletedCommentText: props.comment.text}
        </div>
        <div className={cn('reply')} onClick={callbacks.onReply}>{props.replyText}</div>
      </div>
      {props.children.length > 0 && <div className={cn('nested', { limited: isLimited })}>{props.children}</div>}
      {props.isReplyFormActive && <div className={cn('form', { limited: isLimited })}>{props.replyForm}</div>}
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
  replyText: PropTypes.string,
  isActiveUser: PropTypes.bool
}

ItemComment.defaultProps = {
  onReplyClick: () => {},
  deletedCommentText: 'Комментарий удален',
  replyText: 'Ответить',
  isActiveUser: false
}

export default ItemComment;
