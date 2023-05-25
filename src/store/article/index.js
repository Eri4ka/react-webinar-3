import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      info: {},
      loadingStatus: 'idle',
    }
  }

  /**
   * Загружает товар из АПИ по идентификатору
   * @param {Number} articleId 
   */
  async loadArticle(articleId) {
    try {
      this.setState({
        ...this.getState(),
        loadingStatus: 'loading'
      }, 'Загрузка товара из АПИ началась...');

      const response = await fetch(`api/v1/articles/${articleId}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

      this.setState({
         ...this.getState(),
         info: json.result,
         loadingStatus: 'idle'
      }, 'Загружен товар из АПИ');
      
    } catch {
      this.setState({
        ...this.getState(),
        loadingStatus: 'error'
     }, 'Ошибка при загрузке товара из АПИ');
    }
  }
}

export default Article;
