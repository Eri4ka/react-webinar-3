import { OPTIONS } from './constants';

/**
 * Возвращает отформатированную дату
 * @param {String} dateString 
 * @returns {String}
 */
const transformDate = (dateString) => {
  const dateFromString = new Date(dateString);
  const transformedDate = dateFromString.toLocaleDateString('ru', OPTIONS).replace(/\s*г\./, "");
  return transformedDate;
};

export default transformDate;