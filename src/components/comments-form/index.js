import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsForm(props) {
  const cn = bem('CommentsForm');

  const [commentData, setCommentData] = useState('');

  const callbacks = {
    onChange: (event) => {
      setCommentData(event.target.value);
    },
    onSubmit: (event) => {
      event.preventDefault();
      props.onSubmit(props.parentId, props.type, commentData);
      setCommentData('');
    }
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <label className={cn('label')} htmlFor="comment">{props.labelText[props['type']]}</label>
      <textarea name="comment" className={cn('area')} value={commentData} onChange={callbacks.onChange}></textarea>
      <div>
        <button className={cn('button')} type="submit" disabled={!commentData}>{props.sendText}</button>
        {props.type === 'comment' && (
          <button 
            className={cn('button')} 
            onClick={props.onResetActiveType} 
            type="button">
              {props.cancelText}
          </button>
        )}
      </div>
    </form>
  )
}

CommentsForm.PropTypes = {
  labelText: PropTypes.shape({
    comment: PropTypes.string,
    article: PropTypes.string
  }).isRequired,
  type: PropTypes.oneOf(['article', 'comment']),
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onResetActiveType: PropTypes.func,
  sendText: PropTypes.string,
  cancelText: PropTypes.string,
}

CommentsForm.defaultProps = {
  onResetActiveType: () => {},
  sendText: 'Отправить',
  cancelText: 'Отмена'
}

export default memo(CommentsForm);
