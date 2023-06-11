import { memo, useMemo, useCallback, useEffect } from "react";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import CommentsLayout from "../../components/comments-layout";
import ItemComment from "../../components/item-comment";
import commentsActions from '../../store-redux/comments/actions';
import listToTree from "../../utils/list-to-tree";
import ProtectedComment from "../../components/protected-comment";

function Comments() {
  const params = useParams();
  const dispatch = useDispatch();

  const storeSelect = useSelector(state => ({
    isAutorized: state.session.exists,
    activeUserId: state.session.user._id
  }));

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    countComments: state.comments.countComments,
    waiting: state.comments.waiting,
    activeParentId: state.comments.activeParentId
  }), shallowequal);

  useEffect(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(commentsActions.setActiveParentId(params.id));
  }, [params.id]);

  const options = {
    comments: useMemo(() => (
      listToTree({ list:select.comments, type: 'comment' })
    ), [select.comments])
  };

  const {t} = useTranslate();
  
  const translations = {
    formLabel: t('commentsForm.label'),
    formSend: t('commentsForm.send'),
    formCancel: t('commentsForm.cancel'),
    noticeAdditional: t('commentsNotice.additionalText'),
    noticeCancel: t('commentsNotice.cancel'),
    noticeLink: t('commentsNotice.link'),
    commentsTitle: t('comments.title'),
    commentItemReply: t('commentItem.reply'),
    commentItemDeleted: t('commentItem.deleted')
  }

  const callbacks = {
    // Cоздание нового комментария
    onCreateComment: useCallback((parentId, parentType, commentData) => {
      dispatch(commentsActions.create(parentId, parentType, commentData));
      
      if (select.activeParentId !== params.id) {
        dispatch(commentsActions.setActiveParentId(params.id));
      }   
    }, [params.id]),

    // Сбросить активный идентификатор для привязки комментария на идентификатор текущего товара
    onResetActiveParentId: useCallback(() => {
      dispatch(commentsActions.setActiveParentId(params.id));
    }, [params.id]),

    // Установить активный идентификатор для привязки комментария
    onSetActiveParentId: useCallback((parentId) => {
      dispatch(commentsActions.setActiveParentId(parentId));
    }, [])
  };

  /**
   * Рекурсивно создает дерево комментариев
   * @param {Array} data 
   * @returns {Node}
   */
  const buildTreeOfCommentComponents = (data, nesting = 0) => {
    return data.map((comment) => {
        if (comment.children) {
          return (
            <ItemComment 
              key={comment._id}
              nesting={nesting} 
              comment={comment} 
              replyText={translations.commentItemReply}
              deletedCommentText={translations.commentItemDeleted}
              onReplyClick={callbacks.onSetActiveParentId}
              isActiveUser={storeSelect.activeUserId === comment.author._id}
              isReplyFormActive={select.activeParentId === comment._id}
              replyForm={<ProtectedComment
                isAutorized={storeSelect.isAutorized}
                activeParentId={select.activeParentId}
                parentId={comment._id}
                formLabelText={translations.formLabel}
                type='comment'
                onResetActiveType={callbacks.onResetActiveParentId}
                onSubmitForm={callbacks.onCreateComment}
                formSendText={translations.formSend}
                formCancelText={translations.formCancel}
                noticeLinkText={translations.noticeLink}
                noticeAdditionalText={translations.noticeAdditional}
                noticeCancelText={translations.noticeCancel}
              />}>
              {buildTreeOfCommentComponents(comment.children, nesting + 1)}
            </ItemComment>
          );
        }
       return (
        <ItemComment 
          key={comment._id}
          nesting={nesting}
          comment={comment}
          replyText={translations.commentItemReply}
          deletedCommentText={translations.commentItemDeleted}
          onReplyClick={callbacks.onSetActiveParentId}
          isActiveUser={storeSelect.activeUserId === comment.author._id}
          isReplyFormActive={select.activeParentId !== comment._id}
          replyForm={<ProtectedComment
            isAutorized={storeSelect.isAutorized}
            activeParentId={select.activeParentId}
            parentId={comment._id}
            formLabelText={translations.formLabel}
            type='comment'
            onResetActiveType={callbacks.onResetActiveParentId}
            onSubmitForm={callbacks.onCreateComment}
            formSendText={translations.formSend}
            formCancelText={translations.formCancel}
            noticeLinkText={translations.noticeLink}
            noticeAdditionalText={translations.noticeAdditional}
          />}
          />
       );
     });
   };

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout title={translations.commentsTitle} total={select.countComments}>
        {buildTreeOfCommentComponents(options.comments)}
        <ProtectedComment
          isAutorized={storeSelect.isAutorized}
          activeParentId={select.activeParentId}
          parentId={params.id}
          formLabelText={translations.formLabel}
          type='article'
          onResetActiveType={callbacks.onResetActiveParentId}
          onSubmitForm={callbacks.onCreateComment}
          formSendText={translations.formSend}
          formCancelText={translations.formCancel}
          noticeLinkText={translations.noticeLink}
          noticeAdditionalText={translations.noticeAdditional}
        />
      </CommentsLayout>
    </Spinner>
  );
}

export default memo(Comments);
