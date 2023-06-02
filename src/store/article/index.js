import StoreModule from "../module";
import { getErrorMessage } from "../../utils";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ArticleState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      errorMessage: '',
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      errorMessage: '',
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

      if (!response.ok) {
        throw json.error;
      }

      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false,
        errorMessage: '',
      }, 'Загружен товар из АПИ');

    } catch (e) {
      this.setState({
        data: {},
        waiting: false,
        errorMessage: getErrorMessage(e),
      });
    }
  }
}

export default ArticleState;
