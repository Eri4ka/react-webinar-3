import {useMemo, useState, useLayoutEffect} from "react";
import useServices from "./use-services";
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n

  const [lang, setLang] = useState(() => i18nService.lang);

  const unsubscribe = useMemo(() => {
    return i18nService.subscribe(() => {
      const newState = i18nService.lang;
      setLang(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); 

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  const i18n = useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang: i18nService.setLang,
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => i18nService.translate(text, number, lang)
  }), [lang]);

  return i18n;
}
