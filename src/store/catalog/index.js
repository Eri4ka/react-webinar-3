import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import { ITEMS_PER_PAGE } from '../../constants';

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.itemsPerPage = ITEMS_PER_PAGE;
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      count: 0,
      loadingStatus: 'idle',
    }
  }

  /**
   * Устанавливает текущую страницу каталога
   * @param {Number} page 
   */
  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
  }

  async load() {
    try {
      this.setState({
        ...this.getState(),
        loadingStatus: 'loading'
      }, 'Загрузка товаров из АПИ началась...');

      const skip = this.getState().currentPage > 1 ? 10 * this.getState().currentPage : 0;
      const response = await fetch(`/api/v1/articles?limit=${this.itemsPerPage}&skip=${skip}&fields=items(_id, title, price),count`);
      const json = await response.json();

      this.setState({
         ...this.getState(),
         list: json.result.items,
         count: json.result.count,
         loadingStatus: 'idle'
      }, 'Загружены товары из АПИ');
      
    } catch {
      this.setState({
        ...this.getState(),
        loadingStatus: 'error'
     }, 'Ошибка при загрузке товаров из АПИ');
    }
  }
}

export default Catalog;
