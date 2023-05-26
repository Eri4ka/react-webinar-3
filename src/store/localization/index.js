import StoreModule from "../module";
import ru from '../../translations/ru.json';
import en from '../../translations/en.json';

class Localization extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.availableTranslations = {
      ru,
      en
    };
  }
 
  initState() {
    return {
      currentLang: 'ru',
      translations: this.availableTranslations['ru']
    }
  }

  /**
   * Установить текущий язык
   * @param {String} lang 
   */
  setLanguage(lang){
    this.setState({
      currentLang: lang, 
      translations: this.availableTranslations[lang]
    }, `Установка языка ${lang}`);
  }
}

export default Localization;
