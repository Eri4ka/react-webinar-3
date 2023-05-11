/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.itemId = this.state.list.at(-1).code;
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
   * Увеличение значения индентификатора записи
   * @param {number} prev текущий идентификатор
   */
  increaseId(prev) {
    this.itemId = ++prev;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.increaseId(this.itemId);

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.itemId, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
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
          let initialSelectedCount = item.selectedCount ?? 0;
          const selectedCount = item.selected ? initialSelectedCount : ++initialSelectedCount;
          
          return {...item, selected: !item.selected, selectedCount};
        } 
        return {...item, selected: false};
      })
    })
  }
}

export default Store;
