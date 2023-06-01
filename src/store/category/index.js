import StoreModule from "../module";
import { getCorrectCategoryData } from "../../utils";

/**
 * Состояние категорий
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: [{value: 'all', title: 'Все'}],
      waiting: false
    }
  }

  /**
   * Загрузка категорий
   * @returns {Promise<void>}
   */
  async getCategories() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=`);
      const json = await response.json();

      this.setState({
        data: [...this.getState().data, ...getCorrectCategoryData(json.result.items)],
        waiting: false
      }, 'Загружены категории из АПИ');
      
    } catch {
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
    
  }
}

export default CategoryState;
