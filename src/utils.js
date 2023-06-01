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
 * Рекурисивно создает дерево категорий
 * @param {Array} data 
 * @param {?Number} parent 
 * @returns {Array}
 */
const getCategoryTreeFromData = (data, parent = null) => {
  const categoryTree = [];

  data.forEach(item => {
    const hasParent = item.parent?._id === parent || item.parent === parent

    if (hasParent) {
      const nested = getCategoryTreeFromData(data, item._id);
      
      if (nested) {
        item.nested = nested
      }

      categoryTree.push(item)
    }
  })
 
  return categoryTree
}

/**
 * Нормализует данные в необходимый формат из дерева категорий
 * @param {Array} data 
 * @param {?Number} position 
 * @returns {Array}
 */
const transformDataFromTree = (data, position = 0) => {
  const transformedData = [];

  data.forEach((item) => {
    const eachCategory = {value: item._id, title: position ? `${'-'.repeat(position)} ${item.title}` : item.title}
    transformedData.push(eachCategory)

    if (item.nested) {
      transformedData.push(...transformDataFromTree(item.nested, position + 1))
    }
    
  })

  return transformedData
}

/**
 * Возвращает данные для категорий
 * @param {Array} data 
 * @returns {Array}
 */
export const getCorrectCategoryData = (data) => {
  return transformDataFromTree(getCategoryTreeFromData(data))
}