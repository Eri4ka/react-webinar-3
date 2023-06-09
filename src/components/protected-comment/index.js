import { memo } from "react";
import PropTypes from 'prop-types';
import CommentsNotice from "../../components/comments-notice";
import CommentsForm from "../../components/comments-form";

function ProtectedComment(props) {

  if (props.activeParentId !== props.parentId) {
    return null;
  }

  if (props.isAutorized) {
    return (
      <CommentsForm 
        labelText={props.formLabelText} 
        sendText={props.formSendText}
        cancelText={props.formCancelText}
        onSubmit={props.onSubmitForm} 
        type={props.type}
        onResetActiveType={props.onResetActiveType}
        parentId={props.parentId}
      />
    )
  }
  
  return (
    <CommentsNotice 
      link='/login' 
      linkText={props.noticeLinkText} 
      additionalText={props.noticeAdditionalText}
      cancelText={props.noticeCancelText}
      type={props.type}
      onResetActiveType={props.onResetActiveType}
    />
  )
}

ProtectedComment.PropTypes = {
  isAutorized: PropTypes.bool.isRequired,
  activeParentId: PropTypes.bool.isRequired,
  parentId: PropTypes.bool.isRequired,
  formLabelText: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['article', 'comment']).isRequired,
  onResetActiveType: PropTypes.func,
  onSubmitForm: PropTypes.func.isRequired,
  formSendText: PropTypes.string,
  formCancelText: PropTypes.string,
  noticeLinkText: PropTypes.string,
  noticeAdditionalText: PropTypes.string.isRequired,
  noticeCancelText: PropTypes.string
}

ProtectedComment.defaultProps = {
  onResetActiveType: () => {},
  formSendText: 'Отправить',
  formCancelText: 'Отмена',
  noticeCancelText: 'Отмена'
}

export default memo(ProtectedComment);
