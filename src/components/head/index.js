import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, onChangeLanguage, currentLang, translations }){

  const callbacks = {
    onChangeLanguage: (event) => onChangeLanguage(event.target.value)
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select className='Head-select' value={currentLang} onChange={callbacks.onChangeLanguage} name="localization" >
        <option value="ru">{translations['SelectLang.ru']}</option>
        <option value="en">{translations['SelectLang.en']}</option>
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLanguage: PropTypes.func,
  currentLang: PropTypes.string,
  translations: PropTypes.object
};

Head.defaultProps = {
  onChangeLanguage: () => {},
}

export default memo(Head);
