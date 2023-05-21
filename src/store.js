import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }

  /**
   * Расчет суммы записей в корзине
   * @param {Array} list 
   * @returns {Array}
   */
  calcSumInBasket(list) {
    return list?.reduce((acc, i) => acc + i.price * i.count, 0);
  }

  /**
   * Добавление записи в корзину
   * @param {Object} item 
   */
  addToBasketItem(item) {
    let basketCopy = [...this.state.basket];
    const index = this.state.basket.findIndex((element) => item.code === element.code);

    if (index !== -1) {
      basketCopy[index].count++;
    } else {
      basketCopy = [...basketCopy, { ...item, count: 1 }];
    }

    this.setState({
      ...this.state,
      basket: basketCopy,
      basketSum: this.calcSumInBasket(basketCopy),
      basketCount: basketCopy.length
    });
  }

  /**
   * Удаление записи из корзины
   * @param {Object} item 
   */
  deleteItemFromBasket(item) {
    const newBasket = this.state.basket.filter(element => element.code !== item.code);

    this.setState({
      ...this.state,
      basket: newBasket,
      basketSum: this.calcSumInBasket(newBasket),
      basketCount: newBasket.length
    });
  }
}

export default Store;
