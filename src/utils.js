/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Создает массив чисел из числа
 * @param {Number} num 
 * @returns {Array}
 */
const getArrayFromNum = (num) => [...Array(num).keys()].map(each => each + 1);

/**
 * Создает массив со списком страниц в пагинации
 * @param {Object} param
 * @param {Number} param.maxLeftPagesCount
 * @param {String} param.dots
 * @param {Number} param.currentPage
 * @param {Number} param.firstPage
 * @param {Number} param.lastPage
 * @param {Number} param.pagesCount
 * @returns {Array}
 */
export const getPagesList = ({ maxLeftPagesCount, dots, currentPage, firstPage, lastPage, pagesCount }) => {
  const rightPagesStartsFrom = pagesCount - maxLeftPagesCount + 1;

  if (currentPage < maxLeftPagesCount) {
    return [...getArrayFromNum(maxLeftPagesCount), dots, lastPage]
  }

  if (currentPage === maxLeftPagesCount) {
    return [...getArrayFromNum(maxLeftPagesCount + 1), dots, lastPage]
  }

  if (currentPage > maxLeftPagesCount && currentPage < rightPagesStartsFrom) {
    const middlePages = [currentPage - 1, currentPage, currentPage + 1]
    return [firstPage, dots, ...middlePages, dots, lastPage];
  }

  if (currentPage === rightPagesStartsFrom) {
    const rightPages = getArrayFromNum(pagesCount).slice(rightPagesStartsFrom - 2, pagesCount)
    return [firstPage, dots, ...rightPages] 
  }
  
  const rightPages = getArrayFromNum(pagesCount).slice(rightPagesStartsFrom - 1, pagesCount)
  return [firstPage, dots, ...rightPages] 
};