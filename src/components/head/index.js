import {memo} from "react";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import './style.css';

function Head({ title, onChangeLanguage }){

  const select = useSelector(state => ({
    currentLang: state.localization.currentLang,
    translation: state.localization.translations
  }));

  const callbacks = {
    onChangeLanguage: (event) => onChangeLanguage(event.target.value)
  }
  
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select className='Head-select' value={select.currentLang} onChange={callbacks.onChangeLanguage} name="localization" >
        <option value="ru">{select.translation['SelectLang.ru']}</option>
        <option value="en">{select.translation['SelectLang.en']}</option>
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeLanguage: PropTypes.func
};

Head.defaultProps = {
  onChangeLanguage: () => {},
}

export default memo(Head);
