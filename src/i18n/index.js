import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._lang = localStorage.getItem('lang') || this.config.baseLang;
  }

  get lang() {
    return this._lang;
  }
  
  setLang = (value) => {
    this._lang = value;
    this.services.api.setHeader('Accept-Language', value);

    window.localStorage.setItem('lang', value);
    
    for (const listener of this.services.store.listeners) listener(this._lang);
  }

  subscribe = (listener) => this.services.store.subscribe(listener);

  translate = (text, plural, lang = this._lang) => {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
  
    return result;
  }
}

export default I18nService;