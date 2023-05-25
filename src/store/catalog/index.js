import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
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

  async load(skip, limit) {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
