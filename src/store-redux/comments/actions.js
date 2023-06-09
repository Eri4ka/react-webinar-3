import simplifyErrors from "../../utils/simplify-errors";

export default {
  /**
   * Загрузка комментариев
   * @param articleId
   * @return {Function}
   */
  load: (articleId) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${articleId}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count`
        });

        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  /**
   * Создание комментария
   * @param {String|Number} parentId 
   * @param {String} parentType 
   * @param {String} text 
   * @returns {Function}
   */
  create: (parentId, parentType, text) => {
    return async (dispatch, getState, services) => {
    
      dispatch({type: 'comments/create-start'});

      try {
        const body = {
          text: text,
          parent: {
              _id: parentId,
              _type: parentType
          }
        };

        const res = await services.api.request({
          url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted',
          method: 'POST',
          body: JSON.stringify(body)
        });

        if (!res.data.error) {
          dispatch({type: 'comments/create-success', payload: {data: res.data.result}});
        } else {
          dispatch({type: 'comments/create-error', payload: {data: res.data.error.message || 'Other error'}});
        }
      } catch {
        dispatch({type: 'comments/create-error', payload: {data: 'Other error'}});
      }
    }
  },

  setActiveParentId: (parentId) => {
    return {type: 'comments/set-active-parentId', payload: { parentId }};
  },
}
